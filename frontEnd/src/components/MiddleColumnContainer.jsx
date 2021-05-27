const MiddleColumnContainer = ({children})=>{
    return (
        <div className={"middleColumn"}>
        <div className={"innerCol"}>
            {children}
        </div>
      </div>
    )
};
export default MiddleColumnContainer;