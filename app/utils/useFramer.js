import { useAnimate,useIsPresent,useInView,AnimatePresence,stagger,m } from "framer-motion"; 

 const useFramer = () => {  
  const isPresent = useIsPresent();
  const isInView = useInView;
    const [scope,animate] = useAnimate();
    return {scope,animate,isInView,isPresent,AnimatePresence,stagger,m}
  
}
    
export default useFramer; 