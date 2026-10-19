function r(t,e,u){if(e.table?.defaultValue!==void 0)return e.table.defaultValue;if(e.type==="string")return{summary:"-"};if(u[t]!==void 0)return{summary:String(u[t])}}function d(t,e){return Object.entries(t).reduce((u,[a,l])=>({...u,[a]:{...l,table:{...l.table,defaultValue:r(a,l,e)}}}),{})}export{d as a};
//# sourceMappingURL=add-table-defaults-qMEDfH1P.js.map
