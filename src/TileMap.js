function TileMap(w,h) {
    this.w = w;
    this.h = h;
    this.entrances = {};
    this.tiles = [];
}

TileMap.prototype.setEntity = function(entity, entrance) {
    if (this.entrances[entrance]) {
        this.tiles[this.entrances[entrance]].setEntity(entity);
        return;
    }
    console.error("no entrances", entrance);
    this.tiles[0].setEntity(entity);
}

TileMap.blank = function(w,h) {
    var t = new TileMap(w,h);
    t.initTiles(w,h);
    return t;
}

TileMap.forJsonData = function(data) {
    var t = new TileMap(data.w, data.h);
    var total = t.totalTiles();
    
    for (var i=0; i < total; ++i) {
        t.tiles.push(Tile.forChar(t, data.tileString[i]));
    }
    /*
    for (var i=0; i < total; ++i) {
        t.tiles.push(Tile.forJsonData(t, data.tiles[i]));
    }
    */
    
    t.entrances = data.entrances
    for (var i=0; i < data.exits; ++i) {
        var exit = data.exits[i];
        t.tiles[exit.i].onEnter = function(event) {
            console.log("enter");
        }
    }
    return t;
}

TileMap.prototype.initTiles = function(w,h) {
    this.tiles = [];
    this.w = w;
    this.h = h;
    var total = this.totalTiles();
    for (var i=0; i < total; ++i) {
        this.tiles.push(new Tile(this, "asdf"));
    }
}

TileMap.prototype.totalTiles = function() {
    return this.w * this.h;
}

TileMap.prototype.serialize = function() {
    return {
        w: this.w,
        h: this.h,
        tiles: this.tiles.map(function(t) {
            return t.serialize();
        })
    }
}
