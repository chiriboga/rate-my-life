var quiz = {
    1: {
        q: "I consider myself physically attractive.",
        cats: [{
            name: 'appearance',
            weight: 1
        }],
        sentiment: 'positive'
    },
    2: {
        q: "I often get ill.",
        cats: [{
            name: 'health',
            weight: 1
        }],
        sentiment: 'negative'
    },
    3: {
        q: "I am well-off financially.",
        cats: [{
            name: 'finance',
            weight: 1
        }],
        sentiment: 'positive'
    },
    4: {
        q: "I have a strong relationship with my parents.",
        cats: [{
            name: 'love',
            weight: 1
        }, {
            name: 'mind',
            weight: 0.25
        }],
        sentiment: 'positive'
    },
    5: {
        q: "I generate my own income.",
        cats: [{
            name: 'finance',
            weight: 1
        }],
        sentiment: 'positive'
    },
    6: {
        q: "I often have depressive or suicidal thoughts.",
        cats: [{
            name: 'mind',
            weight: 1
        }],
        sentiment: 'negative'
    },
    7: {
        q: "I have a diagnosed mental illness and I find it debilitating.",
        cats: [{
            name: 'mind',
            weight: 1
        }, {
            name: 'health',
            weight: 0.5
        }],
        sentiment: 'negative'
    },
    8: {
        q: "I have a physical disability and I find it debilitating.",
        cats: [{
            name: 'health',
            weight: 1
        }, {
            name: 'mind',
            weight: 0.5
        }],
        sentiment: 'negative'
    },
    9: {
        q: "I live in a country with freedom of speech.",
        cats: [{
            name: 'environment',
            weight: 1
        }],
        sentiment: 'positive'
    },
    10: {
        q: "I live in an area mostly free of crime.",
        cats: [{
            name: 'environment',
            weight: 1
        }],
        sentiment: 'positive'
    },
    11: {
        q: "I have plenty of free time to pursue my hobbies and passions.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "positive"
    },
    12: {
        q: "I have a romantic partner who I'm deeply in love with.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    13: {
        q: "I have a companion/pet who I love to spend time with.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    14: {
        q: "I often go out with friends.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "positive"
    },
    15: {
        q: "I often look in the mirror and like what I see.",
        cats: [{
            name: "appearance",
            weight: 1
        }],
        sentiment: "positive"
    },
    16: {
        q: "I often worry if I can afford to pay my bills.",
        cats: [{
            name: "finance",
            weight: 1
        }],
        sentiment: "negative"
    },
    17: {
        q: "I generally feel loved by those around me.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    18: {
        q: "Most of my close family is still alive.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    19: {
        q: "I have a lot of free money to spend each week.",
        cats: [{
            name: "finance",
            weight: 1
        }],
        sentiment: "positive"
    },
    20: {
        q: "My parents were very supportive when I was growing up.",
        cats: [{
            name: "love",
            weight: 1
        }, {
            name: "mind",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    21: {
        q: "I went to a good school.",
        cats: [{
            name: "environment",
            weight: 1
        }, {
            name: "social",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    22: {
        q: "I got good grades in school.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "positive"
    },
    23: {
        q: "I'm generally pessimistic about things.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "negative"
    },
    24: {
        q: "People rarely want to hang out with me.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "negative"
    },
    25: {
        q: "I'm not addicted to abusive drugs.",
        cats: [{
            name: "health",
            weight: 1
        }, {
            name: "mind",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    26: {
        q: "My day-to-day life is mundane without anything interesting happening.",
        cats: [{
            name: "environment",
            weight: 1
        }],
        sentiment: "negative"
    },
    27: {
        q: "I have a large social circle of friends who I like.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "positive"
    },
    28: {
        q: "I find it easy to get consensual sex.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    29: {
        q: "I find it difficult to make new friends.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "negative"
    },
    30: {
        q: "Finding romantic partners comes easily to me.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    31: {
        q: "I'm free from physical pain.",
        cats: [{
            name: "health",
            weight: 1
        }],
        sentiment: "positive"
    },
    32: {
        q: "There's plenty of job and education opportunities where I live.",
        cats: [{
            name: "environment",
            weight: 1
        }],
        sentiment: "positive"
    },
    33: {
        q: "The area where I live has beautiful scenery with no litter.",
        cats: [{
            name: "environment",
            weight: 1
        }],
        sentiment: "positive"
    },
    34: {
        q: "Other people often tell me how good I look.",
        cats: [{
            name: "appearance",
            weight: 1
        }],
        sentiment: "positive"
    },
    35: {
        q: "I'm generally confident and have high self-esteem.",
        cats: [{
            name: "mind",
            weight: 1
        }, {
            name: "social",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    36: {
        q: "I often get anxious.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "negative"
    },
    37: {
        q: "My living space/home is luxurious.",
        cats: [{
            name: "environment",
            weight: 1
        }],
        sentiment: "positive"
    },
    38: {
        q: "I have easy and reliable access to food and water.",
        cats: [{
            name: "health",
            weight: 1
        }],
        sentiment: "positive"
    },
    39: {
        q: "I have fast and reliable internet access.",
        cats: [{
            name: "environment",
            weight: 0.5
        }, {
            name: "mind",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    40: {
        q: "I'm able to afford the latest and greatest technology easily.",
        cats: [{
            name: "finance",
            weight: 1
        }],
        sentiment: "positive"
    },
    41: {
        q: "People often tell me how talented I am.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "positive"
    },
    42: {
        q: "I've considered getting cosmetic surgery before.",
        cats: [{
            name: "appearance",
            weight: 1
        }],
        sentiment: "negative"
    },
    43: {
        q: "I have nothing to look forward to in life.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "negative"
    },
    44: {
        q: "I can recall many great moments I've had with friends.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "positive"
    },
    45: {
        q: "I still feel youthful.",
        cats: [{
            name: "health",
            weight: 1
        }],
        sentiment: "positive"
    },
    46: {
        q: "I'm generally likeable.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "positive"
    },
    47: {
        q: "I have to take medication frequently.",
        cats: [{
            name: "health",
            weight: 1
        }],
        sentiment: "negative"
    },
    48: {
        q: "I'm always busy and don't get any time to relax.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "negative"
    },
    49: {
        q: "I rarely feel discriminated against due to race, sex, appearance, etc.",
        cats: [{
            name: "environment",
            weight: 0.5
        }, {
            name: "mind",
            weight: 0.5
        }, {
            name: "finance",
            weight: 0.5
        }, {
            name: "appearance",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    50: {
        q: "I was/am unpopular in school.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "negative"
    },
    51: {
        q: "I'm often a comfortable temperature and rarely have to sweat or freeze.",
        cats: [{
            name: "environment",
            weight: 1
        }, {
            name: "health",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    52: {
        q: "I rarely have to do hard work that I don't want to.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "positive"
    },
    53: {
        q: "I usually have to settle for the cheaper version of a product because I can't afford the better but more expensive one.",
        cats: [{
            name: "finance",
            weight: 1
        }],
        sentiment: "negative"
    },
    54: {
        q: "I own my own home.",
        cats: [{
            name: "finance",
            weight: 1
        }],
        sentiment: "positive"
    },
    55: {
        q: "I feel insecure about my own appearance.",
        cats: [{
            name: "appearance",
            weight: 1
        }],
        sentiment: "negative"
    },
    56: {
        q: "I often got/get bullied in school.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "negative"
    },
    57: {
        q: "I rarely experience any joy from things.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "negative"
    },
    58: {
        q: "I receive compliments frequently.",
        cats: [{
            name: "mind",
            weight: 1
        }, {
            name: "appearance",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    59: {
        q: "I'm physically fit with a good body.",
        cats: [{
            name: "health",
            weight: 1
        }, {
            name: "appearance",
             weight: 1
        }],
        sentiment: "positive"
    },
    60: {
        q: "I don't feel safe.",
        cats: [{
            name: "environment",
            weight: 1
        }, {
            name: "mind",
            weight: 0.5
        }],
        sentiment: "negative"
    }
};

module.exports = quiz;
