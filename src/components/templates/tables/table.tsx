// import React, { useMemo } from 'react'
// import { Column, useSortBy, useTable } from 'react-table'

// const Table = ({ data, columns }: { columns: Column[]; data: any }) => {
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable(
//       {
//         columns,
//         data,
//       },
//       useSortBy
//     )
//   return (
//     <div className={`flex flex-col justify-between h-full min-w-[1300px] `}>
//       <table {...getTableProps()} role="table">
//         <thead className="">
//           {headerGroups?.map((headerGroup, i) => (
//             <tr {...headerGroup.getHeaderGroupProps()} key={i} className="">
//               {headerGroup.headers.map((column: any, i) => {
//                 return (
//                   <th
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     key={i}
//                     className={`pr-6 first:pr-4 pb-6 text-[#1D242B] text-left font-semibold border-b-4 sticky`}
//                   >
//                     {column.render('Header')}
//                     <span>
//                       {column.isSorted && column.Header === 'Status'
//                         ? column.isSortedDesc
//                           ? ' 🔽'
//                           : ' 🔼'
//                         : ''}
//                     </span>
//                   </th>
//                 )
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row: any, i) => {
//             prepareRow(row)
//             return (
//               <React.Fragment key={i}>
//                 <tr {...row.getRowProps()} className="overflow-scroll">
//                   {row.cells.map((cell: any, i: number) => {
//                     return (
//                       <td
//                         {...cell.getCellProps()}
//                         key={i}
//                         className="pb-4 pt-4 border-b-2 pr-3 font-medium text-gray text-16"
//                       >
//                         {cell.render('Cell')}
//                       </td>
//                     )
//                   })}
//                 </tr>
//               </React.Fragment>
//             )
//           })}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default Table
