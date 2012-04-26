fs = require 'fs'
exec = require('child_process').exec

task 'watch', ->
  fs.watchFile './index.jade', (curr, prev) ->
    return unless curr.mtime.getTime() isnt prev.mtime.getTime()
    exec 'jade index.jade', -> console.log 'compiled jade'
  fs.watchFile './stylesheets/style.styl', (curr, prev) ->
    return unless curr.mtime.getTime() isnt prev.mtime.getTime()
    exec 'stylus stylesheets/style.styl', -> console.log 'compiled styl'