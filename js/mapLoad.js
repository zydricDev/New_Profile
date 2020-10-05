import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';

class MapLoad extends Highway.Renderer{

    onEnter(){
      const tl= new TimelineLite();
      var element = document.getElementById('switch_view')
      tl.fromTo(element.children[0], 1, {opacity: 1},{opacity: 1, onComplete: function(){
        let view = document.getElementById('content');
        let mapDiv = document.createElement('div');
        mapDiv.setAttribute('id', 'map');
        view.appendChild(mapDiv);

        let map_script = document.createElement('script');

        map_script.innerHTML =
        function initMap() {
          var mapOptions = {
            center: new google.maps.LatLng(40.7282,-73.7949),
            zoom: 11,
            styles:
            [
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "saturation": "100"
                        },
                        {
                            "gamma": "0.00"
                        },
                        {
                            "color": "#ff0000"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "saturation": "100"
                        },
                        {
                            "color": "#3500ff"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#4b3da9"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#f90000"
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "saturation": "100"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#2b00ff"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "saturation": "100"
                        },
                        {
                            "color": "#cdcdcd"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#3f00ff"
                        },
                        {
                            "saturation": "100"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "saturation": "100"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#464fec"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]

          }
          var uluru = {lat: 40.7282, lng: -73.7949};
          var map = new google.maps.Map(
          document.getElementById('map'), mapOptions);
          var iconBase = {
            url: "testMark.png",
            scaledSize: new google.maps.Size(75, 75)
          }
          var marker = new google.maps.Marker(
            { position: uluru,
              map: map,
              icon: iconBase
            });

        }
        view.appendChild(map_script);


        let script = document.createElement('script');

        let key = "AIzaSyCxz3AG8xxfMuXMbR5ND5zL0Y8StCtNYNg";
        script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key='+key+'&callback=initMap');
        view.appendChild(script);
      }});

      }


    onLeaveCompleted(){

      if(document.getElementById('switch_view') !==null){
        const tl= new TimelineLite();
        var element = document.getElementById('switch_view')
        tl.fromTo(element.children[0], 1, {opacity: 1},{opacity: 1, onComplete: function(){
          element.remove();
        }});
      }


    }
}

export default MapLoad;
