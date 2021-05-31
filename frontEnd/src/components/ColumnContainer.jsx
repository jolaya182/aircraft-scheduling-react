const ColumnContainer = ({children, wide})=>{
    return (
        <div className={ wide === true ? "column-middle": "column-side"}>
        <div className={"inner-col"}>
            {children}
        </div>
      </div>
    )
};
export default ColumnContainer;