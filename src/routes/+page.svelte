<script lang="ts">
	import {
		columnNames,
		finalFourColumnNames,
		rawData,
		regions,
		roundKeys,
		type RegionName,
		type Team
	} from '$lib/tourney-data';

	type RoundSlot = Team | null;
	type RoundSlots = RoundSlot[];
	type BracketState = Record<
		RegionName,
		[RoundSlots, RoundSlots, RoundSlots, RoundSlots, RoundSlots]
	>;
	type Matchup = { matchIdx: number; teams: readonly [RoundSlot, RoundSlot] };

	const roundIndices = [0, 1, 2, 3, 4] as const;

	function createInitialPicks(): BracketState {
		return {
			East: [
				[...rawData.East],
				Array(8).fill(null),
				Array(4).fill(null),
				Array(2).fill(null),
				Array(1).fill(null)
			],
			South: [
				[...rawData.South],
				Array(8).fill(null),
				Array(4).fill(null),
				Array(2).fill(null),
				Array(1).fill(null)
			],
			Midwest: [
				[...rawData.Midwest],
				Array(8).fill(null),
				Array(4).fill(null),
				Array(2).fill(null),
				Array(1).fill(null)
			],
			West: [
				[...rawData.West],
				Array(8).fill(null),
				Array(4).fill(null),
				Array(2).fill(null),
				Array(1).fill(null)
			]
		};
	}

	let currentTab = $state<RegionName | 'Final Four'>('East');
	let picks = $state<BracketState>(createInitialPicks());

	// Final Four picks: [Finals (2 teams), Champion (1 team)]
	let f4Picks = $state<[RoundSlots, RoundSlots]>([Array(2).fill(null), Array(1).fill(null)]);

	function getF4Teams() {
		return [picks.East[4][0], picks.South[4][0], picks.Midwest[4][0], picks.West[4][0]];
	}

	// We validate f4Picks against getF4Teams so if a regional winner changer, downstream picks reset
	$effect(() => {
		const f4 = getF4Teams();

		// Map indices: 0 -> East vs South, 1 -> Midwest vs West
		const matchup0Teams = [f4[0], f4[1]];
		const matchup1Teams = [f4[2], f4[3]];

		if (f4Picks[0][0] && !matchup0Teams.some((t) => t?.name === f4Picks[0][0]?.name)) {
			f4Picks[0][0] = null;
		}
		if (f4Picks[0][1] && !matchup1Teams.some((t) => t?.name === f4Picks[0][1]?.name)) {
			f4Picks[0][1] = null;
		}

		if (f4Picks[1][0] && !f4Picks[0].some((t) => t?.name === f4Picks[1][0]?.name)) {
			f4Picks[1][0] = null;
		}
	});

	function getRawProb(team: RoundSlot, roundRouteKey: number | 'f4' | 'finals' | 'champ'): number {
		if (!team) return 0;

		if (typeof roundRouteKey === 'number') {
			if (roundRouteKey === 0) return team.r32;

			const previousKey = roundKeys[roundRouteKey - 1];
			const currentKey = roundKeys[roundRouteKey];

			if (!previousKey || !currentKey) return 0;

			const previousProbability = team[previousKey];
			const currentProbability = team[currentKey];

			if (previousProbability <= 0) return 0;

			return currentProbability / previousProbability;
		} else {
			// for final four views
			let prev = 1;
			if (roundRouteKey === 'finals') prev = team.f4 || 1;
			if (roundRouteKey === 'champ') prev = team.finals || 1;

			const curr = team[roundRouteKey];
			if (prev <= 0) return 0;
			return curr / prev;
		}
	}

	function calcProb(
		team: RoundSlot,
		opponent: RoundSlot,
		roundRouteKey: number | 'f4' | 'finals' | 'champ'
	): string {
		if (!team) return '0.0';

		const teamProb = getRawProb(team, roundRouteKey);

		if (!opponent) {
			return (teamProb * 100).toFixed(1);
		}

		const oppProb = getRawProb(opponent, roundRouteKey);

		if (teamProb === 0 && oppProb === 0) return '0.0';

		return ((teamProb / (teamProb + oppProb)) * 100).toFixed(1);
	}

	function getRoundMatchups(region: RegionName, roundIdx: number): Matchup[] {
		const teams = picks[region][roundIdx];

		return Array.from({ length: teams.length / 2 }, (_, matchIdx) => ({
			matchIdx,
			teams: [teams[matchIdx * 2] ?? null, teams[matchIdx * 2 + 1] ?? null]
		}));
	}

	function isSelected(
		region: RegionName,
		roundIdx: number,
		matchIdx: number,
		team: RoundSlot
	): boolean {
		if (!team || roundIdx >= 4) return false;
		return picks[region][roundIdx + 1][matchIdx]?.name === team.name;
	}

	function handlePick(region: RegionName, roundIdx: number, matchIdx: number, teamIndex: number) {
		if (roundIdx >= 4) return;

		const team = picks[region][roundIdx][matchIdx * 2 + teamIndex];
		if (!team) return;

		picks[region][roundIdx + 1][matchIdx] = team;

		for (let futureRound = roundIdx + 2; futureRound <= 4; futureRound += 1) {
			const futureMatchIdx = Math.floor(matchIdx / 2 ** (futureRound - (roundIdx + 1)));
			const futureTeam = picks[region][futureRound][futureMatchIdx];

			if (futureTeam && futureTeam.name !== team.name) {
				picks[region][futureRound][futureMatchIdx] = null;
			}
		}
	}

	function handleF4Pick(roundIdx: number, matchIdx: number, teamIndex: number) {
		let team: RoundSlot = null;

		if (roundIdx === 0) {
			const f4 = getF4Teams();
			team = f4[matchIdx * 2 + teamIndex];
			if (team) f4Picks[0][matchIdx] = team;
		} else if (roundIdx === 1) {
			team = f4Picks[0][matchIdx * 2 + teamIndex];
			if (team) f4Picks[1][matchIdx] = team;
		}
	}

	function isF4Selected(roundIdx: number, matchIdx: number, team: RoundSlot): boolean {
		if (!team) return false;
		if (roundIdx === 0) {
			return f4Picks[0][matchIdx]?.name === team.name;
		} else if (roundIdx === 1) {
			return f4Picks[1][0]?.name === team.name;
		}
		return false;
	}
</script>

<svelte:head>
	<title>NCAA Tourney Picker</title>
	<meta
		name="description"
		content="Pick winners across each region and compare each team's current-round win probability."
	/>
</svelte:head>

<div class="page">
	<section class="hero">
		<div class="hero-copy">
			<p class="eyebrow">Local bracket sandbox</p>
			<h1>Bracket Predictor</h1>
			<p class="intro">
				Click a team to advance it through the bracket. The percentage on each card is that
				team&apos;s chance of winning its current matchup.
			</p>
		</div>

		<div class="hero-stats" aria-label="Bracket summary">
			<div>
				<strong>64</strong>
				<span>teams total</span>
			</div>
			<div>
				<strong>4</strong>
				<span>regions</span>
			</div>
			<div>
				<strong>1</strong>
				<span>national champion</span>
			</div>
		</div>
	</section>

	<nav class="tabs" aria-label="Tournament regions">
		{#each regions as region (region)}
			<button
				type="button"
				class:active={region === currentTab}
				aria-pressed={region === currentTab}
				onclick={() => (currentTab = region)}
			>
				{region}
			</button>
		{/each}
		<button
			type="button"
			class:active={'Final Four' === currentTab}
			aria-pressed={'Final Four' === currentTab}
			onclick={() => (currentTab = 'Final Four')}
		>
			Final Four
		</button>
	</nav>

	<section class="bracket-shell">
		<div class="bracket">
			{#if currentTab !== 'Final Four'}
				{#each roundIndices as roundIndex (roundIndex)}
					<section class="column" style={`--column-index: ${roundIndex};`}>
						<header class="column-header">{columnNames[roundIndex]}</header>

						<div class="column-body">
							{#if roundIndex === 4}
								<article class:filled={Boolean(picks[currentTab][4][0])} class="champion-card">
									<span class="seed">{picks[currentTab][4][0]?.seed ?? '-'}</span>
									<div class="team-copy">
										<strong>{picks[currentTab][4][0]?.name ?? 'TBD'}</strong>
										<small>{currentTab} winner</small>
									</div>
								</article>
							{:else}
								{#each getRoundMatchups(currentTab, roundIndex) as matchup (matchup.matchIdx)}
									<div class="matchup">
										{#each matchup.teams as team, teamIndex (teamIndex)}
											{@const opponent = matchup.teams[teamIndex === 0 ? 1 : 0]}
											<button
												type="button"
												class="team"
												class:empty={!team}
												class:selected={isSelected(currentTab, roundIndex, matchup.matchIdx, team)}
												disabled={!team}
												onclick={() =>
													handlePick(
														currentTab as RegionName,
														roundIndex,
														matchup.matchIdx,
														teamIndex
													)}
											>
												<span class="identity">
													<span class="seed">{team?.seed ?? '-'}</span>
													<span class="name">{team?.name ?? 'TBD'}</span>
												</span>

												{#if team}
													<span class="prob">{calcProb(team, opponent, roundIndex)}%</span>
												{/if}
											</button>
										{/each}
									</div>
								{/each}
							{/if}
						</div>
					</section>
				{/each}
			{:else}
				<!-- Final Four View -->
				<!-- Column 0: Final Four -->
				<section class="column" style="--column-index: 0;">
					<header class="column-header">{finalFourColumnNames[0]}</header>

					<div class="column-body">
						<div class="matchup">
							{#each [getF4Teams()[0], getF4Teams()[1]] as team, teamIndex}
								{@const opponent = teamIndex === 0 ? getF4Teams()[1] : getF4Teams()[0]}
								<button
									type="button"
									class="team"
									class:empty={!team}
									class:selected={isF4Selected(0, 0, team)}
									disabled={!team}
									onclick={() => handleF4Pick(0, 0, teamIndex)}
								>
									<span class="identity">
										<span class="seed">{team?.seed ?? '-'}</span>
										<span class="name">{team?.name ?? 'TBD'}</span>
									</span>

									{#if team}
										<span class="prob">{calcProb(team, opponent, 'finals')}%</span>
									{/if}
								</button>
							{/each}
						</div>

						<div class="matchup">
							{#each [getF4Teams()[2], getF4Teams()[3]] as team, teamIndex}
								{@const opponent = teamIndex === 0 ? getF4Teams()[3] : getF4Teams()[2]}
								<button
									type="button"
									class="team"
									class:empty={!team}
									class:selected={isF4Selected(0, 1, team)}
									disabled={!team}
									onclick={() => handleF4Pick(0, 1, teamIndex)}
								>
									<span class="identity">
										<span class="seed">{team?.seed ?? '-'}</span>
										<span class="name">{team?.name ?? 'TBD'}</span>
									</span>

									{#if team}
										<span class="prob">{calcProb(team, opponent, 'finals')}%</span>
									{/if}
								</button>
							{/each}
						</div>
						</div>
						</section>

						<!-- Column 1: National Championship -->
						<section class="column" style="--column-index: 1;">
						<header class="column-header">{finalFourColumnNames[1]}</header>

						<div class="column-body">
						<div class="matchup" style="margin-top: 2rem;">
							{#each f4Picks[0] as team, teamIndex}
								{@const opponent = teamIndex === 0 ? f4Picks[0][1] : f4Picks[0][0]}
								<button
									type="button"
									class="team"
									class:empty={!team}
									class:selected={isF4Selected(1, 0, team)}
									disabled={!team}
									onclick={() => handleF4Pick(1, 0, teamIndex)}
								>
									<span class="identity">
										<span class="seed">{team?.seed ?? '-'}</span>
										<span class="name">{team?.name ?? 'TBD'}</span>
									</span>

									{#if team}
										<span class="prob">{calcProb(team, opponent, 'champ')}%</span>
									{/if}
								</button>
							{/each}
						</div>					</div>
				</section>

				<!-- Column 2: Champion -->
				<section class="column" style="--column-index: 2;">
					<header class="column-header">{finalFourColumnNames[2]}</header>

					<div class="column-body">
						<article
							class:filled={Boolean(f4Picks[1][0])}
							class="champion-card"
							style="margin-top: 4rem;"
						>
							<span class="seed">{f4Picks[1][0]?.seed ?? '-'}</span>
							<div class="team-copy">
								<strong>{f4Picks[1][0]?.name ?? 'TBD'}</strong>
								<small>National Champion</small>
							</div>
						</article>
					</div>
				</section>
			{/if}
		</div>
	</section>
</div>

<style>
	.page {
		max-width: 100rem;
		margin: 0 auto;
		padding: clamp(1rem, 2vw, 2rem);
		display: grid;
		gap: 1.25rem;
	}

	.hero {
		display: grid;
		gap: 1rem;
		grid-template-columns: minmax(0, 1.7fr) minmax(18rem, 0.9fr);
		padding: clamp(1.25rem, 2vw, 2rem);
		border: 1px solid var(--line-soft);
		border-radius: 1.5rem;
		background:
			linear-gradient(135deg, rgba(125, 211, 252, 0.08), transparent 40%),
			linear-gradient(160deg, rgba(245, 158, 11, 0.08), transparent 50%), var(--bg-surface);
		box-shadow: 0 24px 60px rgba(1, 6, 18, 0.28);
		backdrop-filter: blur(18px);
	}

	.hero-copy {
		display: grid;
		gap: 0.75rem;
	}

	.eyebrow {
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent);
	}

	h1 {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 5vw, 4.8rem);
		line-height: 0.95;
		letter-spacing: 0.03em;
	}

	.intro {
		max-width: 44rem;
		font-size: 1rem;
		line-height: 1.65;
		color: var(--text-secondary);
	}

	.hero-stats {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
		align-self: stretch;
	}

	.hero-stats div {
		display: grid;
		gap: 0.25rem;
		align-content: center;
		padding: 1rem;
		border-radius: 1rem;
		border: 1px solid rgba(125, 211, 252, 0.16);
		background: rgba(8, 16, 29, 0.45);
	}

	.hero-stats strong {
		font-family: var(--font-display);
		font-size: clamp(1.4rem, 3vw, 2.2rem);
		color: var(--text-primary);
	}

	.hero-stats span {
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.tabs button {
		border: 1px solid var(--line-soft);
		border-radius: 999px;
		background: rgba(15, 23, 42, 0.72);
		padding: 0.8rem 1.2rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			transform 180ms ease,
			border-color 180ms ease,
			background-color 180ms ease,
			color 180ms ease;
	}

	.tabs button:hover {
		transform: translateY(-1px);
		border-color: rgba(125, 211, 252, 0.34);
		color: var(--text-primary);
	}

	.tabs button.active {
		background: linear-gradient(135deg, rgba(56, 189, 248, 0.24), rgba(14, 165, 233, 0.32));
		border-color: rgba(125, 211, 252, 0.5);
		color: var(--text-primary);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
	}

	.bracket-shell {
		padding: 0.25rem;
		border-radius: 1.75rem;
		border: 1px solid var(--line-soft);
		background: rgba(8, 16, 29, 0.5);
		overflow-x: auto;
		box-shadow: 0 30px 70px rgba(1, 6, 18, 0.24);
	}

	.bracket {
		display: flex;
		gap: 1rem;
		min-width: max-content;
		padding: 1rem;
	}

	.column {
		width: min(16rem, 82vw);
		flex: 0 0 min(16rem, 82vw);
		display: grid;
		gap: 0.9rem;
		animation: lift-in 420ms ease both;
		animation-delay: calc(var(--column-index) * 65ms);
		grid-template-rows: auto 1fr;
	}

	.column-header {
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
		padding: 0 0.5rem;
	}

	.column-body {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		justify-content: space-around;
		height: 100%;
	}

	.matchup {
		display: flex;
		flex-direction: column;
		gap: 2px;
		border-radius: 0.5rem;
		background: rgba(15, 23, 42, 0.4);
		padding: 3px;
		border: 1px solid var(--line);
	}

	.team {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.55rem 0.6rem;
		border: none;
		background: transparent;
		color: var(--text-primary);
		border-radius: 0.35rem;
		font-size: 0.95rem;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition:
			background-color 150ms ease,
			color 150ms ease;
	}

	.team::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--accent);
		opacity: 0;
		transition: opacity 150ms ease;
		z-index: 0;
	}

	.team.empty {
		color: var(--text-muted);
		cursor: default;
		background: rgba(0, 0, 0, 0.1);
	}

	.team:not(.empty):hover {
		background: rgba(125, 211, 252, 0.12);
	}

	.team.selected {
		color: #fff;
		font-weight: 600;
	}

	.team.selected::before {
		opacity: 1;
	}

	.identity,
	.prob {
		position: relative;
		z-index: 1;
	}

	.identity {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.seed {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--text-muted);
		width: 1.2rem;
		text-align: right;
	}

	.team.selected .seed {
		color: rgba(255, 255, 255, 0.8);
	}

	.prob {
		font-size: 0.8rem;
		font-variant-numeric: tabular-nums;
		color: var(--text-secondary);
	}

	.team.selected .prob {
		color: rgba(255, 255, 255, 0.9);
	}

	.champion-card {
		padding: 1.5rem;
		border-radius: 1rem;
		border: 1px dashed var(--line);
		background: rgba(15, 23, 42, 0.5);
		display: flex;
		gap: 1rem;
		align-items: center;
		margin: auto 0;
		transition:
			background-color 300ms ease,
			border-color 300ms ease;
	}

	.champion-card.filled {
		background: linear-gradient(135deg, rgba(8, 145, 178, 0.15), rgba(3, 105, 161, 0.25));
		border-color: rgba(14, 165, 233, 0.4);
		box-shadow: 0 8px 32px rgba(14, 165, 233, 0.15);
	}

	.champion-card .seed {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
		background: var(--bg-surface);
		border: 1px solid var(--line-soft);
		font-size: 0.9rem;
	}

	.champion-card.filled .seed {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
		color: #fff;
	}

	.team-copy {
		display: grid;
		gap: 0.25rem;
	}

	.team-copy strong {
		font-size: 1.25rem;
		color: var(--text-muted);
		transition: color 200ms ease;
	}

	.champion-card.filled strong {
		color: #fff;
	}

	.team-copy small {
		font-size: 0.8rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.champion-card.filled small {
		color: rgba(255, 255, 255, 0.7);
	}

	@keyframes lift-in {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
