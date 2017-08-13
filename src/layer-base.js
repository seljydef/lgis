import Tangram from 'tangram';


export default class BaseLayer {
  constructor(map, gui) {
    this.layer = Tangram.leafletLayer({
      scene: 'base.yaml',
      attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>',
    });
    this.layer.on('init', () => {
      gui.addCamera(this.layer.scene);
    }).addTo(map);
  }
}
