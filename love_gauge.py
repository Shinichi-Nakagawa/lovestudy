#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime

from pymongo import *
from app_conf import *


class LoveGauge(object):
	pass

	def __init__(self):
		self._init_db()
		self.now = self._now_time()

	def _now_time(self):
		return datetime.now()

	def _init_db(self):
		self.con = Connection("127.0.0.1", 27017)
		self.db = self.con.love

	def gen_coll(self):
		return self.db[COLLECTION]

	def get_heart(self, coll):
		cnt = coll.find(P_KEY).count()
		if cnt == 0:
			return self.column_heart()
		else:
			return coll.find_one(P_KEY)

	def column_heart(self):
		# TODO 面倒くさいのでKeyは固定
		return {"key": 1, "heart": 0, "date": 0, "switch": OFF, "time": None}

	def run(self):
		coll = self.gen_coll()
		row = self.get_heart(coll)
		row_date = row["time"]
		if row_date is None:
			# オブジェクト無し
			return
		elif type(row_date) is not datetime:
			# Date型じゃない
			return
		elif (self.now - row_date).seconds < 3600:
			# 現在時刻と引き算して1時間(3600秒)未満
			return

		if (6 < row_date.hour <= 9) and (row["switch"] == True):
			row["heart"] = row["heart"] + INC_HEART
			row["time"] = self.now
		elif (16 < row_date.hour <= 24) and (row["switch"] == True):
			row["heart"] = row["heart"] + INC_HEART
			row["time"] = self.now
		elif (row["switch"] == False) and (row["heart"] > 0):
			row["heart"] = row["heart"] - DEC_HEART
			row["time"] = self.now
		elif (row["switch"] == False):
			row["heart"] = 0
			row["time"] = self.now
		else:
			pass

		if row["heart"] > MAX_HEART:
			row["heart"] = MIN_HEART
			row["date"] = row["date"] + 1
			row["time"] = self.now

		coll.save(row)

if __name__ == '__main__':
	cl = LoveGauge()
	cl.run()

