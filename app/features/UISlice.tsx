import { createSlice } from "@reduxjs/toolkit";
import { retrieveAllData } from "../localStorage";
import { cropsData, landData, waterSourceData } from "../data";


const uiSlice = createSlice({
    name: "ui",
    initialState: {
        waterSource: [{}],
        cropType: [{}],
        landCover: [{}]
    },
    reducers: {
        setWaterSourceCropTypeLandCover: (state) => {
            const dataArray = retrieveAllData();
            // console.log("HELLo", dataArray)
            const w:any ={}
            const c:any = {}
            const l:any = {}
            const cropArr = []
            const waterArr = []
            const landArr = []
            for(const element of dataArray){
                const cropType = (element?.cropInformation?.primarySeason?.cropName)
                const waterType = (element?.cropInformation?.waterSource)
                const landType = (element?.landCoverType);
                
                if(!w[waterType]){
                    w[waterType] = 1;
                }
                else{
                    w[waterType]++;
                }
                if(!c[cropType]){
                    c[cropType] = 1;
                }
                else{
                    c[cropType]++;
                }
                if(!l[landType]){
                    l[landType] = 1;
                }
                else{
                    l[landType]++;
                }
                state.cropType = c;
                state.landCover = l;
                state.waterSource = w;
            }
            for(let a in l){
                if(a == "null" || a == null || typeof a == typeof {} || l[a] == undefined) continue;
                landArr.push({
                    title: a,
                    value: l[a]
                })
            }
            for(let a in c){
                if(a == "null" || a == null || typeof a == typeof {} || c[a] == undefined) continue;
                cropArr.push({
                    title: a,
                    value: c[a]
                })
            }
            for(let a in w){
                if(a == "null" || a == null || typeof a == typeof {} || w[a] == undefined) continue;
                waterArr.push({
                    title: a,
                    value: w[a]
                })
            }
            state.waterSource = waterArr
            state.cropType = cropArr
            state.landCover = landArr
            console.log(state)
        }
 
    }
})

export const selectUiData = (state: any) => state.ui
export const {setWaterSourceCropTypeLandCover} = uiSlice.actions
export default uiSlice.reducer