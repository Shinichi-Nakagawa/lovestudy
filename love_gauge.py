#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pymongo import *
from app_conf import *


class LoveGauge(object):
	pass

	def __init__(self):
		self._init_db()

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

	def column_heart():
		# TODO 面倒くさいのでKeyは固定
		return {"key": 1, "heart": 0, "date": 0, "switch": OFF, "time": None}

	def run(self):
		pass

if __name__ == '__main__':
	cl = LoveGauge

