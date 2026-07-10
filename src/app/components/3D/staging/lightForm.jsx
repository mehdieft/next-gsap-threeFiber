import { Lightformer,Float } from "@react-three/drei"
import { useControls } from "leva"


export default function LightForm(){
   
    const {intisityOne,colorOne,scale,posOne,posTwo,scaleTwo}=useControls({
        colorOne:'#ff0000',
    
        scale:{
            value:{x:8,y:8,z:8},
            min:-10,
            max:10,
            step:0.1
        },
        intisityOne:{
            value:1,
            min:0,max:10
        },
        posOne:{
            value:{x:5,y:10,z:0},
            min:-10,
            max:10,
            step:0.1
        },
        posTwo:{
            value:{x:3,y:5,z:-2},
            min:-10,
            max:10
        },
        scaleTwo:{
            value:{x:2,y:2,z:2},
            min:1,
            max:10
        }
    })
  
    return(
        <>
  

      <Lightformer
        intensity={0.8}
        position={[0, 5, -2]}
        scale={[10, 10, 1]}
        target={[0, 0, 0]}
      />

      {/* LEFT */}
      <Lightformer
        position={[-5, 2, 0]}
        target={[0, 0, 0]}
        scale={[10, 1, 1]}
        color="blue"
        intensity={4}
      />
     

      {/* RIGHT */}
      <Lightformer
        position={[5, 1, 3]}
        scale={[10, 1, 1]}
        target={[0, 0, 0]}
        color="green"
        intensity={4}
      />
      <Lightformer
        position={[2, 0, 0]}
        scale={[0.1, 5, 1]}
        target={[0, 0, 0]}
        color="purple"
        intensity={3}
      />
      <Lightformer
        form="ring"
        position={[5, 3, 2]}
        scale={5}
        target={[0, 0, 0]}
        intensity={2.5}
      />

      {/* FRONT */}
      <Lightformer position={[0, 0.5, 5]} scale={[4, 0.5, 1]} intensity={2} />
    </>
        
    )
}