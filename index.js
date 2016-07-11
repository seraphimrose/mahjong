var store

function init() {
	store = {
		m : {},
		s : {},
		p : {}
	}

	pos = 0
}

function parse(tehai) {

	var SHURUI = ['m', 's', 'p']
	var SUUJI = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
	var AVA_LEN = 13
	var pos = 0
	var suuji_now = 0

	var PARSE_ERROR = "TeHai's format is error."

	function isSuuji(c) {
		return SUUJI.indexOf(c) !== -1
	}
	function isShurui(c) {
		return SHURUI.indexOf(c) !== -1
	}
	function isEnd(tehai) {
		return tehai[pos] === undefined
	}
	function isAvailable(pos) {
		return pos === AVA_LEN
	}

	function add(_suuji, _shurui) {
		if (store[_shurui][_suuji] === undefined) {
			store[_shurui][_suuji] = 1
		} else {
			store[_shurui][_suuji] ++
		}
	}

	function shurui(tehai) {
		if (isShurui(tehai[pos])) {
			add(suuji_now, tehai[pos])
			pos++
			hai(tehai)
		} else {
			throw new Error(PARSE_ERROR)
		}
	}

	function suuji(tehai) {
		if (isSuuji(tehai[pos])) {
			suuji_now = tehai[pos]
			pos++
			shurui(tehai)
		} else {
			if (isEnd(tehai)) return
			throw new Error(PARSE_ERROR)
		}
	}

	function hai(tehai) {
		suuji(tehai)
	}

	try {
		tehai = tehai.replace(' ', '')
		hai(tehai)
		if (isAvailable(pos)) {
			throw new Error(PARSE_ERROR)
		}
	} catch (e) {
		console.error(e.message)
	}

}

function mahjong(tehai) {
	init()
	parse(tehai)
	console.log(store)
}