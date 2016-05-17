'use strict'

//This seems problematic, some of the tests are timing out?

var PF = require('pathfinding')

function convertNDarray(grid) {
  var result = new PF.Grid(grid.shape[0], grid.shape[1])
  for(var i=0; i<grid.shape[0]; ++i) {
    for(var j=0; j<grid.shape[1]; ++j) {
      result.setWalkableAt(i, j, !grid.get(i,j))
    }
  }
  return result
}

function wrap(FinderType) {
  var finder = new FinderType({
    allowDiagonal: false
  })
  return function(grid) {
    var converted = convertNDarray(grid)
    return function(sy, sx, ty, tx, out) {
      var path = finder.findPath(sx, sy, tx, ty, converted.clone())
      return path.length
    }
  }
}

exports.astar = wrap(PF.AStarFinder)
exports.bestFirst = wrap(PF.BestFirstFinder)
exports.bfs = wrap(PF.BreadthFirstFinder)
exports.dijkstra = wrap(PF.DijkstraFinder)
exports.jps = wrap(PF.JumpPointFinder)
exports.biastar = wrap(PF.BiAStarFinder)
exports.bibestFirst = wrap(PF.BiBestFirstFinder)
exports.bibfs = wrap(PF.BiBreadthFirstFinder)
exports.bidijkstra = wrap(PF.BiDijkstraFinder)
