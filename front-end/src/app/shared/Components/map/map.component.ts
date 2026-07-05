import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule, FormsModule],
})
export class MapComponent implements OnInit {

  searchText: string = '';

  map!: L.Map;
  marker!: L.Marker;

  selectMode = false;

  placeName: string = '';
  fullAddress: string = '';
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number; placeName: string; fullAddress: string }>();
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initMap();
  }

  // ================= INIT MAP =================
  initMap() {
    this.map = L.map('map').setView([31.963158, 35.930359], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.marker = L.marker([31.963158, 35.930359], {
      draggable: true
    }).addTo(this.map);

    // 🟢 FIXED CLICK MODE
    this.map.on('click', (e: any) => {
      this.ngZone.run(() => {
        if (!this.selectMode) return;

        this.setLocation(e.latlng.lat, e.latlng.lng);
        this.selectMode = false;
      });
    });

    // drag marker
    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.setLocation(pos.lat, pos.lng);
    });

    //this.setLocation(31.963158, 35.930359);
  }

  // ================= SET LOCATION =================
  setLocation(lat: number, lng: number) {
    this.marker.setLatLng([lat, lng]);
    this.map.setView([lat, lng], 15);

    this.reverseGeocode(lat, lng);
  }

  // ================= SEARCH (AR + EN + FUZZY JORDAN) =================
  searchLocation() {
    if (!this.searchText.trim()) return;

    const query = this.normalizeText(this.searchText);

    const viewbox = '34.955,29.185,39.301,33.375';

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=jo&viewbox=${viewbox}&bounded=1`
    )
      .then(res => res.json())
      .then(results => {

        if (!results.length) {
          // fallback search
          return fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=jo`
          ).then(res => res.json());
        }

        return results;
      })
      .then(results => {

        if (!results || !results.length) {
          alert('❌ لا توجد نتائج داخل الأردن 🇯🇴');
          return;
        }

        const place = results[0];

        this.setLocation(+place.lat, +place.lon);
      });
  }

  // ================= NORMALIZE TEXT (FIX AR SPELLING) =================
  normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/ة/g, 'ه')
      .replace(/أ|إ|آ/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // ================= REVERSE GEO =================
  reverseGeocode(lat: number, lng: number) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    )
      .then(res => res.json())
      .then(data => {

        this.ngZone.run(() => {

          this.placeName =
            data.name ||
            data.address?.road ||
            data.address?.suburb ||
            'Unknown place';

          this.fullAddress =
            data.display_name || 'No address found';
        });
        this.locationSelected.emit({ lat, lng, placeName: this.placeName, fullAddress: this.fullAddress });
      });
  }

  // ================= MY LOCATION =================
  myLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setLocation(pos.coords.latitude, pos.coords.longitude);
    });
  }

  // ================= ENABLE SELECT MODE =================
  enableSelectMode() {
    this.selectMode = true;
  }
}