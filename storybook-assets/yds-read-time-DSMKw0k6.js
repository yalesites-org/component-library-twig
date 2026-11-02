Drupal.behaviors.ReadTime={attach(e){const n=e.querySelector("#main-content"),t=e.querySelector("#read_time");if(!n||!t)return;const o=200,i=n.textContent.replace(/\s+/g," ").trim().split(" ").length;if(i>o){const a=i/o;t.textContent=Math.ceil(a).toString()}else t.textContent="less than 1"}};
//# sourceMappingURL=yds-read-time-DSMKw0k6.js.map
