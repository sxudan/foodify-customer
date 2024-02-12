
export interface UserLocation {
    latitude: number
    longitude: number
    label: string
    addressString: string
    description?: string
}

export interface PreferenceState {
    currentLocation: UserLocation | null
    deliveryLocation?: UserLocation | null
}