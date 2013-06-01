#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pymongo import *
from datetime import datetime
import json
from app_conf import *
from flask import Flask, request, render_template, Response

app = Flask(__name__)


def column_heart():
    # TODO 面倒くさいのでKeyは固定
    return {"key": 1, "heart": 0, "date": 0, "switch": OFF, "time": None}


def get_heart(coll):
    cnt = coll.find(P_KEY).count()
    if cnt == 0:
        return column_heart()
    else:
        return coll.find_one(P_KEY)


def gen_coll():
    con = Connection("127.0.0.1", 27017)
    db = con.love
    return db[COLLECTION]


def now_time():
    return datetime.now()


def request2params():
    """
    Requestオブジェクトからパラメータ取得
    """
    if request.method == 'POST':
        params = request.form
    elif request.method == 'GET':
        params = request.args
    else:
        params = {}
    return params


def response2json(value):
    """
    JSONレスポンス生成(RESTful API用)
    """
    return Response(json.dumps(value), mimetype="application/json")


@app.route('/top.html', methods=['GET'])
def top():
    """
    Top画面
    """
    return render_template('index.html', value={"name": u"これはルート画面です"})


@app.route('/result.html', methods=['GET'])
def result():
    """
    履歴（成績）画面
    """
    return render_template('index.html', value={"name": u"これは履歴画面です"})


@app.route(URL_FOR_INIT, methods=['POST', 'GET'])
def init():
    """
    初期化
    """
    params = request2params()
    # TODO MongoDBを初期化
    value = {"message": u"initialize Done."}

    return response2json(value)


@app.route(URL_FOR_METER_ON, methods=['POST', 'GET'])
def meter_on():
    """
    メーターをONする
    """
    params = request2params()
    now = now_time()
    coll = gen_coll()
    row = get_heart(coll)
    row["time"] = now
    row["switch"] = ON
    coll.save(row)

    value = {"switch": ON}

    return response2json(value)


@app.route(URL_FOR_METER_OFF, methods=['POST', 'GET'])
def meter_off():
    """
    メーターをOFFする
    """
    params = request2params()
    now = now_time()
    coll = gen_coll()
    row = get_heart(coll)
    row["time"] = now
    row["switch"] = OFF
    coll.save(row)

    value = {"switch": OFF}

    return response2json(value)


@app.route(URL_FOR_METER_SHOW, methods=['GET'])
def meter_show():
    """
    メーターを見る
    """
    params = request2params()
    coll = gen_coll()
    row = get_heart(coll)
    value = {}
    for key in ("heart", "date"):
        value[key] = row[key]

    return response2json(value)


@app.route(URL_FOR_DATE_SHOW, methods=['GET'])
def date_show():
    """
    デートの約束を確認する
    """
    params = request2params()
    coll = gen_coll()
    row = get_heart(coll)
    value = {}
    for key in ("date",):
        value[key] = row[key]

    return response2json(value)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)
    #app.run(debug=True, host="127.0.0.1", port=8080)
