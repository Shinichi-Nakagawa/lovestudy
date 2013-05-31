#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
from app_conf import *
from flask import Flask, request, render_template, Response

app = Flask(__name__)


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
    print params
    value = {"message": u"initialize Done."}

    return response2json(value)


@app.route(URL_FOR_METER_ON, methods=['POST', 'GET'])
def meter_on():
    """
    メーターをONする
    """
    params = request2params()
    print params
    value = {"message": u"メーターに追加"}

    return response2json(value)


@app.route(URL_FOR_METER_OFF, methods=['POST', 'GET'])
def meter_off():
    """
    メーターをOFFする
    """
    params = request2params()
    print params
    value = {"message": u"メーターを下げる"}

    return response2json(value)


@app.route(URL_FOR_METER_SHOW, methods=['GET'])
def meter_show():
    """
    メーターを見る
    """
    params = request2params()
    print params
    value = {"message": u"メーターを見る"}

    return response2json(value)


@app.route(URL_FOR_DATE_SHOW, methods=['GET'])
def date_show():
    """
    デートの約束を確認する
    """
    params = request2params()
    print params
    value = {"message": u"デートの約束を確認"}

    return response2json(value)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)
