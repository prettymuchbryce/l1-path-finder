'use strict'
var EasyStar = require('easystarjs')
var unpack = require('ndarray-unpack')
module.exports = function(grid) {
  var array = unpack(grid)
  var easystar = new EasyStar.js()
  easystar.setGrid(array)
  easystar.setAcceptableTiles([0])
  easystar.enableSync()

  return function(sy, sx, ty, tx, out) {
    var result
    easystar.findPath(sy, sx, ty, tx, function(path) {
      if (path) {
        result = path.length
      } else {
        result = 0
      }
    })
    easystar.calculate()
    return result
  }
}