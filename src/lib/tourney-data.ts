export type Team = {
	name: string;
	seed: number;
	r32: number;
	s16: number;
	e8: number;
	f4: number;
	finals: number;
	champ: number;
};

export const regions = ['East', 'South', 'Midwest', 'West'] as const;
export type RegionName = (typeof regions)[number];

export const roundKeys = ['r32', 's16', 'e8', 'f4', 'finals', 'champ'] as const;
export const columnNames = [
	'Round of 64',
	'Round of 32',
	'Sweet 16',
	'Elite 8',
	'Regional Champ'
] as const;

export const finalFourColumnNames = [
	'Final Four',
	'National Championship',
	'National Champion'
] as const;

export const rawData = {
	East: [
		{
			name: 'Duke',
			seed: 1,
			r32: 0.9876999999999999,
			s16: 0.8449,
			e8: 0.6578,
			f4: 0.5056,
			finals: 0.3273,
			champ: 0.1909
		},
		{
			name: 'Siena',
			seed: 16,
			r32: 0.0124,
			s16: 0.0007000000000000001,
			e8: 0,
			f4: 0,
			finals: 0,
			champ: 0
		},
		{
			name: 'Ohio St.',
			seed: 8,
			r32: 0.6417,
			s16: 0.1134,
			e8: 0.053399999999999996,
			f4: 0.024399999999999998,
			finals: 0.008199999999999999,
			champ: 0.0024
		},
		{
			name: 'TCU',
			seed: 9,
			r32: 0.3583,
			s16: 0.040999999999999995,
			e8: 0.0144,
			f4: 0.0048,
			finals: 0.0011,
			champ: 0.0002
		},
		{
			name: "St. John's",
			seed: 5,
			r32: 0.8254,
			s16: 0.5067,
			e8: 0.16579999999999998,
			f4: 0.0946,
			finals: 0.0404,
			champ: 0.0149
		},
		{
			name: 'Northern Iowa',
			seed: 12,
			r32: 0.1746,
			s16: 0.0536,
			e8: 0.006500000000000001,
			f4: 0.0017000000000000001,
			finals: 0.0003,
			champ: 0.0001
		},
		{
			name: 'Kansas',
			seed: 4,
			r32: 0.8626,
			s16: 0.4165,
			e8: 0.1011,
			f4: 0.0482,
			finals: 0.0174,
			champ: 0.0055000000000000005
		},
		{
			name: 'California Baptist',
			seed: 13,
			r32: 0.1375,
			s16: 0.0232,
			e8: 0.0011,
			f4: 0.0002,
			finals: 0,
			champ: 0
		},
		{
			name: 'Louisville',
			seed: 6,
			r32: 0.6986,
			s16: 0.3556,
			e8: 0.18280000000000002,
			f4: 0.0582,
			finals: 0.024399999999999998,
			champ: 0.0086
		},
		{
			name: 'South Florida',
			seed: 11,
			r32: 0.3014,
			s16: 0.0941,
			e8: 0.0308,
			f4: 0.0054,
			finals: 0.001,
			champ: 0.0002
		},
		{
			name: 'Michigan St.',
			seed: 3,
			r32: 0.924,
			s16: 0.5403,
			e8: 0.2834,
			f4: 0.0941,
			finals: 0.038900000000000004,
			champ: 0.0139
		},
		{
			name: 'North Dakota St.',
			seed: 14,
			r32: 0.0761,
			s16: 0.01,
			e8: 0.0012,
			f4: 0.0001,
			finals: 0,
			champ: 0
		},
		{
			name: 'UCLA',
			seed: 7,
			r32: 0.6916,
			s16: 0.252,
			e8: 0.1051,
			f4: 0.025699999999999997,
			finals: 0.008199999999999999,
			champ: 0.0024
		},
		{
			name: 'UCF',
			seed: 10,
			r32: 0.3084,
			s16: 0.0679,
			e8: 0.0183,
			f4: 0.0026,
			finals: 0.0005,
			champ: 0.0001
		},
		{
			name: 'UConn',
			seed: 2,
			r32: 0.9418000000000001,
			s16: 0.6714,
			e8: 0.3775,
			f4: 0.1346,
			finals: 0.056799999999999996,
			champ: 0.0206
		},
		{
			name: 'Furman',
			seed: 15,
			r32: 0.0582,
			s16: 0.0088,
			e8: 0.001,
			f4: 0,
			finals: 0,
			champ: 0
		}
	],
	South: [
		{
			name: 'Florida',
			seed: 1,
			r32: 0.9915999999999999,
			s16: 0.8356999999999999,
			e8: 0.6008,
			f4: 0.34380000000000005,
			finals: 0.18510000000000001,
			champ: 0.09369999999999999
		},
		{
			name: 'Prairie View A&M',
			seed: 16,
			r32: 0.0084,
			s16: 0.0003,
			e8: 0,
			f4: 0,
			finals: 0,
			champ: 0
		},
		{
			name: 'Clemson',
			seed: 8,
			r32: 0.4028,
			s16: 0.0621,
			e8: 0.0229,
			f4: 0.0059,
			finals: 0.0015,
			champ: 0.0003
		},
		{
			name: 'Iowa',
			seed: 9,
			r32: 0.5972,
			s16: 0.1018,
			e8: 0.0414,
			f4: 0.0118,
			finals: 0.0034000000000000002,
			champ: 0.001
		},
		{
			name: 'Vanderbilt',
			seed: 5,
			r32: 0.8404,
			s16: 0.5013000000000001,
			e8: 0.18789999999999998,
			f4: 0.0785,
			finals: 0.031200000000000002,
			champ: 0.0118
		},
		{
			name: 'McNeese',
			seed: 12,
			r32: 0.15960000000000002,
			s16: 0.0451,
			e8: 0.006500000000000001,
			f4: 0.0012,
			finals: 0.0002,
			champ: 0
		},
		{
			name: 'Nebraska',
			seed: 4,
			r32: 0.9268000000000001,
			s16: 0.44689999999999996,
			e8: 0.1401,
			f4: 0.0487,
			finals: 0.0166,
			champ: 0.0055000000000000005
		},
		{
			name: 'Troy',
			seed: 13,
			r32: 0.0732,
			s16: 0.0067,
			e8: 0.0003,
			f4: 0,
			finals: 0,
			champ: 0
		},
		{
			name: 'North Carolina',
			seed: 6,
			r32: 0.5022,
			s16: 0.10490000000000001,
			e8: 0.022099999999999998,
			f4: 0.004699999999999999,
			finals: 0.001,
			champ: 0.0002
		},
		{
			name: 'VCU',
			seed: 11,
			r32: 0.4978,
			s16: 0.1027,
			e8: 0.0218,
			f4: 0.0048,
			finals: 0.0009,
			champ: 0.0002
		},
		{
			name: 'Illinois',
			seed: 3,
			r32: 0.971,
			s16: 0.7881,
			e8: 0.3765,
			f4: 0.1867,
			finals: 0.09029999999999999,
			champ: 0.0404
		},
		{
			name: 'Penn',
			seed: 14,
			r32: 0.028999999999999998,
			s16: 0.0043,
			e8: 0.0002,
			f4: 0,
			finals: 0,
			champ: 0
		},
		{
			name: "Saint Mary's (CA)",
			seed: 7,
			r32: 0.5819,
			s16: 0.1578,
			e8: 0.0581,
			f4: 0.0178,
			finals: 0.005,
			champ: 0.0013
		},
		{
			name: 'Texas A&M',
			seed: 10,
			r32: 0.4181,
			s16: 0.0873,
			e8: 0.0286,
			f4: 0.0070999999999999995,
			finals: 0.0016,
			champ: 0.0003
		},
		{
			name: 'Houston',
			seed: 2,
			r32: 0.9684,
			s16: 0.7514,
			e8: 0.4925,
			f4: 0.2888,
			finals: 0.1389,
			champ: 0.06269999999999999
		},
		{
			name: 'Idaho',
			seed: 15,
			r32: 0.0316,
			s16: 0.0036,
			e8: 0.0002,
			f4: 0,
			finals: 0,
			champ: 0
		}
	],
	Midwest: [
		{
			name: 'Michigan',
			seed: 1,
			r32: 0.9806,
			s16: 0.8802,
			e8: 0.7384999999999999,
			f4: 0.5146000000000001,
			finals: 0.32189999999999996,
			champ: 0.19390000000000002
		},
		{
			name: 'Howard',
			seed: 16,
			r32: 0.0194,
			s16: 0.0028000000000000004,
			e8: 0.0004,
			f4: 0,
			finals: 0,
			champ: 0
		},
		{
			name: 'Georgia',
			seed: 8,
			r32: 0.5743,
			s16: 0.0716,
			e8: 0.0319,
			f4: 0.009300000000000001,
			finals: 0.0024,
			champ: 0.0006
		},
		{
			name: 'Saint Louis',
			seed: 9,
			r32: 0.4257,
			s16: 0.0454,
			e8: 0.0189,
			f4: 0.005,
			finals: 0.0012,
			champ: 0.0003
		},
		{
			name: 'Texas Tech',
			seed: 5,
			r32: 0.7037,
			s16: 0.2768,
			e8: 0.049,
			f4: 0.0149,
			finals: 0.004,
			champ: 0.0011
		},
		{
			name: 'Akron',
			seed: 12,
			r32: 0.2963,
			s16: 0.0675,
			e8: 0.0067,
			f4: 0.001,
			finals: 0.0002,
			champ: 0
		},
		{
			name: 'Alabama',
			seed: 4,
			r32: 0.8731,
			s16: 0.6162,
			e8: 0.1515,
			f4: 0.06269999999999999,
			finals: 0.0225,
			champ: 0.008100000000000001
		},
		{
			name: 'Hofstra',
			seed: 13,
			r32: 0.12689999999999999,
			s16: 0.039599999999999996,
			e8: 0.0031,
			f4: 0.0004,
			finals: 0.0001,
			champ: 0
		},
		{
			name: 'Tennessee',
			seed: 6,
			r32: 0.8752,
			s16: 0.4165,
			e8: 0.1562,
			f4: 0.0492,
			finals: 0.0178,
			champ: 0.0060999999999999995
		},
		{
			name: 'Miami University (OH)',
			seed: 11,
			r32: 0.12480000000000001,
			s16: 0.019299999999999998,
			e8: 0.002,
			f4: 0.0002,
			finals: 0,
			champ: 0
		},
		{
			name: 'Virginia',
			seed: 3,
			r32: 0.9443,
			s16: 0.5578,
			e8: 0.22149999999999997,
			f4: 0.073,
			finals: 0.028399999999999998,
			champ: 0.0106
		},
		{
			name: 'Wright St.',
			seed: 14,
			r32: 0.0557,
			s16: 0.0064,
			e8: 0.0004,
			f4: 0,
			finals: 0,
			champ: 0
		},
		{
			name: 'Kentucky',
			seed: 7,
			r32: 0.639,
			s16: 0.1797,
			e8: 0.0837,
			f4: 0.0245,
			finals: 0.0087,
			champ: 0.0028000000000000004
		},
		{
			name: 'Santa Clara',
			seed: 10,
			r32: 0.361,
			s16: 0.0692,
			e8: 0.0236,
			f4: 0.004699999999999999,
			finals: 0.0011,
			champ: 0.0002
		},
		{
			name: 'Iowa St.',
			seed: 2,
			r32: 0.9752,
			s16: 0.7487,
			e8: 0.5125,
			f4: 0.24059999999999998,
			finals: 0.12480000000000001,
			champ: 0.0625
		},
		{
			name: 'Tennessee St.',
			seed: 15,
			r32: 0.024900000000000002,
			s16: 0.0023,
			e8: 0.0002,
			f4: 0,
			finals: 0,
			champ: 0
		}
	],
	West: [
		{
			name: 'Arizona',
			seed: 1,
			r32: 0.9898,
			s16: 0.8898999999999999,
			e8: 0.7212000000000001,
			f4: 0.5294,
			finals: 0.2934,
			champ: 0.16620000000000001
		},
		{
			name: 'LIU',
			seed: 16,
			r32: 0.0102,
			s16: 0.0008,
			e8: 0,
			f4: 0,
			finals: 0,
			champ: 0
		},
		{
			name: 'Villanova',
			seed: 8,
			r32: 0.40880000000000005,
			s16: 0.0387,
			e8: 0.0131,
			f4: 0.0036,
			finals: 0.0008,
			champ: 0.0002
		},
		{
			name: 'Utah St.',
			seed: 9,
			r32: 0.5912,
			s16: 0.0707,
			e8: 0.028399999999999998,
			f4: 0.0103,
			finals: 0.0023,
			champ: 0.0006
		},
		{
			name: 'Wisconsin',
			seed: 5,
			r32: 0.8312,
			s16: 0.4032,
			e8: 0.09359999999999999,
			f4: 0.0398,
			finals: 0.0125,
			champ: 0.0043
		},
		{
			name: 'High Point',
			seed: 12,
			r32: 0.16879999999999998,
			s16: 0.0334,
			e8: 0.0024,
			f4: 0.0005,
			finals: 0.0001,
			champ: 0
		},
		{
			name: 'Arkansas',
			seed: 4,
			r32: 0.9270999999999999,
			s16: 0.5521,
			e8: 0.1407,
			f4: 0.0658,
			finals: 0.022400000000000003,
			champ: 0.0077
		},
		{
			name: 'Hawaii',
			seed: 13,
			r32: 0.0729,
			s16: 0.0113,
			e8: 0.0006,
			f4: 0.0001,
			finals: 0,
			champ: 0
		},
		{
			name: 'BYU',
			seed: 6,
			r32: 0.5628,
			s16: 0.1655,
			e8: 0.055999999999999994,
			f4: 0.0118,
			finals: 0.0025,
			champ: 0.0006
		},
		{
			name: 'Texas',
			seed: 11,
			r32: 0.4372,
			s16: 0.1173,
			e8: 0.036000000000000004,
			f4: 0.0072,
			finals: 0.0016,
			champ: 0.0005
		},
		{
			name: 'Gonzaga',
			seed: 3,
			r32: 0.9645,
			s16: 0.7136,
			e8: 0.36829999999999996,
			f4: 0.1336,
			finals: 0.045700000000000005,
			champ: 0.0165
		},
		{
			name: 'Kennesaw St.',
			seed: 14,
			r32: 0.0355,
			s16: 0.0036,
			e8: 0.0002,
			f4: 0,
			finals: 0,
			champ: 0
		},
		{
			name: 'U Miami (FL)',
			seed: 7,
			r32: 0.5600999999999999,
			s16: 0.1363,
			e8: 0.0504,
			f4: 0.0109,
			finals: 0.0025,
			champ: 0.0006
		},
		{
			name: 'Missouri',
			seed: 10,
			r32: 0.4399,
			s16: 0.0941,
			e8: 0.028900000000000002,
			f4: 0.005,
			finals: 0.001,
			champ: 0.0002
		},
		{
			name: 'Purdue',
			seed: 2,
			r32: 0.9781,
			s16: 0.7676000000000001,
			e8: 0.46020000000000005,
			f4: 0.1821,
			finals: 0.0824,
			champ: 0.0395
		},
		{
			name: 'Queens',
			seed: 15,
			r32: 0.0219,
			s16: 0.0021,
			e8: 0.0001,
			f4: 0,
			finals: 0,
			champ: 0
		}
	]
} satisfies Record<RegionName, Team[]>;
