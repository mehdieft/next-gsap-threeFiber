import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { useControls } from "leva";

export default function Effects(){
    const vigneteConfig=useControls('vignete',{
        enabled:true,
        offset:{value:0.5,min:0,max:10},
        darkness:{value:0.92,min:0,max:1}
    })
    return(
        <>
        <EffectComposer >
            {vigneteConfig.enabled && <Vignette {...vigneteConfig} />}
        </EffectComposer>
        </>
    )
}