import { Component, NgZone, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

 searchText: string = '';
  map!: L.Map;
  marker!: L.Marker;
  selectMode = false;
  placeName = '';
  fullAddress = '';


  constructor(private ngZone: NgZone) {}
  ngOnInit(): void {
    this.initMap()
  }


  initMap() {
    this.map = L.map('map').setView([31.963158, 35.930359], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    this.marker = L.marker([31.963158, 35.930359], {
      draggable: true,
    }).addTo(this.map);

    // 🖱️ click only if enabled
    this.map.on('click', (e: any) => {
      if (!this.selectMode) return;

      this.setLocation(e.latlng.lat, e.latlng.lng);

      this.selectMode = false;
    });

    // drag marker
    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.setLocation(pos.lat, pos.lng);
    });

    this.setLocation(31.963158, 35.930359);
  }

  setLocation(lat: number, lng: number) {
    this.marker.setLatLng([lat, lng]);
    this.map.setView([lat, lng], 15);

    this.reverseGeocode(lat, lng);
  }

  searchLocation() {
    if (!this.searchText) return;

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${this.searchText}&countrycodes=jo`,
    )
      .then((res) => res.json())
      .then((results) => {
        if (!results.length) {
          alert('لم يتم العثور على نتائج');
          return;
        }
        const place = results[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        this.setLocation(lat, lng);
      });
  }

  reverseGeocode(lat: number, lng: number) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    )
      .then((res) => res.json())
      .then((data) => {
        this.ngZone.run(() => {
          this.placeName =
            data.name ||
            data.address?.road ||
            data.address?.suburb ||
            'Unknown place';

          this.fullAddress = data.display_name || 'No address found';
        });
      });
  }

  myLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      this.setLocation(lat, lng);
    });
  }

  
  enableSelectMode() {
    this.selectMode = true;
  }
}
