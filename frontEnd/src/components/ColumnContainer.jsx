/**
 * title: ColumnContainer.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: this component separates the aircrafts rotation list and flights
 */

/**
 *
 *
 * @param {Component, boolean} {children, wide}
 * @return {Component} 
 */
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