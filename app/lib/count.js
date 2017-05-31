'use strict';

module.exports = function (goods, address) {

    let total = 0;
    let addressKey = '';

    if ('安徽'.indexOf(address) !== -1) {
        addressKey = 'anhui';
    }
    if ('江苏浙江上海'.indexOf(address) !== -1) {
        addressKey = 'jiang';
    }
    if ('河南、江西、湖北、山东、北京、天津、陕西、河北、山西、湖南'.indexOf(address) !== -1) {
        addressKey = 'bei';
    }
    if ('福建、重庆、辽宁、四川、贵州、广西、甘肃、宁夏、云南、海南、青海、内蒙古'.indexOf(address) !== -1) {
        addressKey = 'nan';
    }
    if ('广东、（呼伦贝尔、兴安盟）、吉林、黑龙江'.indexOf(address) !== -1) {
        addressKey = 'hennan';
    }
    if ('新疆'.indexOf(address) !== -1) {
        addressKey = 'xinjiang';
    }
    if ('西藏'.indexOf(address) !== -1) {
        addressKey = 'xizang';
    }
    if ('香港澳门'.indexOf(address) !== -1) {
        addressKey = 'gangao';
    }
    if ('台湾'.indexOf(address) !== -1) {
        addressKey = 'tai';
    }
    if (!addressKey) {
        addressKey = 'tai';
    }

    function ceiling(x) {
        if (x <= 1) {
            return 1
        }
        if (Math.ceil(x) - x >= 0.5) {
            x = Math.ceil(x) - 0.5;
        } else {
            x = Math.ceil(x);
        }
        return x;
    }

    let map = {
        'jiang': function (x) {
            return 12 + ceiling(x) * 2
        },
        'anhui': function (x) {
            return 14 + ceiling(x) * 2
        },
        'bei': function (x) {
            return 18 + ceiling(x) * 2.5
        },
        'nan': function (x) {
            return 18 + ceiling(x) * 3
        },
        'hennan': function (x) {
            return 18 + ceiling(x) * 4.5
        },
        'xinjiang': function (x) {
            return 20 + ceiling(x) * 5
        },
        'xizang': function (x) {
            return 26 + ceiling(x) * 10.5
        },
        'gangao': function (x) {
            return 24 + ceiling(x) * 8
        },
        'tai': function (x) {
            return 36 + ceiling(x) * 28
        }
    }

    if (goods) {
        for (let i = 0, l = goods.length; i < l; i++) {
            total += map[addressKey](goods[i].quantity * goods[i].weight);
        }
    } else {
        total = 0;
    }
    return total

}