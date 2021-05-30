const MiddleColumnContainer = ({children})=>{
    return (
        <div className={"column-middle"}>
        <div className={"innerCol"}>
            {children}
        </div>
      </div>
    )
};
export default MiddleColumnContainer;