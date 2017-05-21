'use strict';

const moment = require('moment');
const marked = require('marked');

// 新增购物车内容
exports.add = function* () {
    if (!this.session.user.id) {
        this.body = {
            success: false
        }
    }
    const quantity = this.request.body.quantity;
    const goods_id = parseInt(this.request.body.goods_id);
    const material = this.request.body.material;

    yield this.service.cart.insert({
        user_id: this.session.user.id,
        goods_id,
        quantity,
        material
    });
    this.body = {
        success: true
    }

};

// 展示购物车
exports.index = function* () {

    if (!this.session.user) {
        this.redirect('/');
        return;
    }else if(!this.session.user.id){
        this.redirect('/');
        return;
    }

    let total = 0;
    
    let goods = yield this.service.cart.list(this.session.user.id);
    let address = yield this.service.address.list(this.session.user.id, 1, 1);

    if(address[0]){
        address = address[0];
    }else{
        address = {};
    }

    if (goods) {
        for (let i = 0, l = goods.length; i < l; i++) {
            let goodsInfo = yield this.service.goods.find(goods[i].goods_id);
            delete goodsInfo.id;
            Object.assign(goods[i], goodsInfo);
            total += parseInt(goods[i].price)* goods[i].quantity;
        }
    } else {
        goods = [];
    }
    yield this.render('cart.html', {
        goods,
        total,
        address
    });
};

// 删除一个物品
exports.deleteCarts = function* () {
    const id = +this.request.body.id;

    const success = yield this.service.cart.remove({id:id});

    if (success) {
        this.body = true;
    } else {
        this.body = false;
    }
};
/*

exports.find = function* () {
  const id = +this.query.id;
  const article = yield this.service.article.find(id);

  article.fromNow = moment(article.modified_time).fromNow();
  article.html = marked(article.content);

  yield this.render('post.html', article);

};
*/