"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export type MapRegion = {
  name: string
  description: string
  region: string
  lat: number
  lng: number
}

// Brand-styled CSS marker — no external icon assets (which used to break the build/CDN).
const makeIcon = (active: boolean) =>
  L.divIcon({
    className: "aravia-marker",
    html: `<span style="
      display:flex;align-items:center;justify-content:center;
      width:${active ? 26 : 16}px;height:${active ? 26 : 16}px;
      border-radius:9999px;border:2px solid #fff;
      background:${active ? "#b08733" : "#122536"};
      box-shadow:0 2px 8px rgba(18,37,54,.35);
      transition:all .2s ease;"></span>`,
    iconSize: [active ? 26 : 16, active ? 26 : 16],
    iconAnchor: [active ? 13 : 8, active ? 13 : 8],
    popupAnchor: [0, active ? -14 : -10],
  })

function FlyToSelected({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([lat, lng], 10, { duration: 1.1 })
  }, [lat, lng, map])
  return null
}

export default function ClientBhutanMap({
  regions,
  selectedRegion,
  onSelect,
}: {
  regions: MapRegion[]
  selectedRegion: string
  onSelect?: (name: string) => void
}) {
  const selected = regions.find((r) => r.name === selectedRegion) || regions[0]

  return (
    <MapContainer
      center={[selected.lat, selected.lng]}
      zoom={9}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />
      {regions.map((region) => {
        const active = region.name === selectedRegion
        return (
          <Marker
            key={region.name}
            position={[region.lat, region.lng]}
            icon={makeIcon(active)}
            eventHandlers={{ click: () => onSelect?.(region.name) }}
            zIndexOffset={active ? 1000 : 0}
          >
            <Popup>
              <strong>{region.name}</strong>
              <br />
              {region.description}
            </Popup>
          </Marker>
        )
      })}
      <FlyToSelected lat={selected.lat} lng={selected.lng} />
    </MapContainer>
  )
}
