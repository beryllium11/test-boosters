import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.covid19api.com/',
    withCredentials: true
})

export const WorldWipAPI = {
    getWorldWip(getParams: GetWorldWipParamsType) {
        return instance.get<GetWorldWipResponseType>('world', {params: getParams});
    }
}
export const CountriesAPI = {
    getDataByCountry(data: GetDataByCountryType) {
        return instance.get<GetCountryDataResponseType>(`https://api.covid19api.com/live/country/${data.country}/status/confirmed/date/${data.date}`)
    }
}
export type GetWorldWipParamsType = {
    from?: string
    to?: string
}
export type GetDataByCountryType = {
    country: string
    date: string
}
export type GetWorldWipResponseType = Array<GetWorldWipResponseItemType>
export type GetWorldWipResponseItemType = {
    NewConfirmed: number
    TotalConfirmed: number
    NewDeaths: number
    TotalDeaths: number
    NewRecovered: number
    TotalRecovered: number
    Date: string
}

export type GetCountryDataResponseItemType = {
    ID: string
    Country: string
    CountryCode: string
    Province?: string
    City?: string
    CityCode?: number
    Lat: number
    Lon: number,
    Confirmed: number
    Deaths: number
    Recovered: number
    Active: number
    Date: string
}
export type GetCountryDataResponseType = Array<GetCountryDataResponseItemType>
