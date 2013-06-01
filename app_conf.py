#!/usr/bin/env python
# -*- coding: utf-8 -*-

# URL

DOMAIN_METER = "heart"
DOMAIN_DATE = "date"
DOMAIN_MEDIA = "media"

# 愛のメーターをON/OFF/見る
URL_FOR_METER_ON = "/%s/on.json" % (DOMAIN_METER)
URL_FOR_METER_OFF = "/%s/off.json" % (DOMAIN_METER)
URL_FOR_METER_SHOW = "/%s/misete.json" % (DOMAIN_METER)

# デートの約束を確認する
URL_FOR_DATE_SHOW = "/%s/yakusoku.json" % (DOMAIN_DATE)

# 君の声を聞く
URL_FOR_MEDIA_PLAY = "/%s/play.json" % (DOMAIN_MEDIA)

# やり直す
URL_FOR_INIT = "/init.json"

# PARAMS

MAX_HEART = 100
MIN_HEART = 0

ON = True
OFF = False

# Collection
COLLECTION = "heart"
P_KEY = {"key": 1}
