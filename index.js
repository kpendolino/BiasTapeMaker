const versionNo="0.2";

import {unitObj,meas} from './utils.js';
export {unitObj,meas};
import {svg,group,rect,hLine,vLine,path,guideRect, pathCmdList,text,setSvgAttributes} from './svg.js';
export{path,pathCmdList,guideRect,setSvgAttributes,group,rect,text};
import {
  LEFT,RIGHT,CENTER,SIDES,
  FOLD,FOLDINNER,FOLDOUT,STRIP,STRIPINNER,EDGE,REFS,
  SLIDE,GUIDE,BASE,SECTIONS,
  FILL,STYLE,TEXTANCHOR,
  SIDE,INDEX,REF,X,Y} from './const.js';
export {
  LEFT,RIGHT,CENTER,SIDES,
  FOLD,FOLDINNER,FOLDOUT,STRIP,STRIPINNER,EDGE,REFS,
  SLIDE,GUIDE,BASE,SECTIONS,
  FILL,STYLE,TEXTANCHOR,
  SIDE,INDEX,REF,X,Y};
import {Guides} from './guides.js';
export {guides}
import {topCutout,bottomCutout,splitterTabs,addCircleTabs} from './basicCuts.js';
export {topCutout,bottomCutout,splitterTabs,addCircleTabs};
import drawSlide from './drawSlide.js';
import drawGuide from './drawGuide.js';
import {printUsage,sectionConfig,style,params} from './config.js';
export {printUsage,params,style};

var guides = new Guides();
guides.calculate();

var svgDrawing = svg(params.page.width.u,params.page.height.u);
document.body.appendChild(svgDrawing);

for (let sectI in SECTIONS) {
  var sect=SECTIONS[sectI];
  var groupObj = group(sect);
  var sectConfig=sectionConfig.get(sect);
  groupObj.setAttribute("transform","translate("+sectConfig.offset.u+" "+0+")");
  svgDrawing.appendChild(groupObj);

  var frame = rect(0,0,params.baseWidth.u,params.page.height.u,sectConfig.fill);
  frame.setAttribute("id",sect.name+"-frame")
  if (sect.name==BASE) setFoldAttributes(frame);
  groupObj.appendChild(frame);

  for (const i in SIDES) {
    let side=SIDES [i];
    for (const j in REFS) {
      let ref=REFS[j];
      if (guides.ax(X).side(side).ref(ref)) {
        var guide = vLine({x:{SIDE: side,REF:ref}});
        guide.setAttribute("id",(side+"-"+ref));
        guide.setAttribute("stroke",(style.guide.stroke));
        groupObj.append(guide);
      }
    }
  }
  if (sect.name==BASE) addCircleTabs(groupObj,RIGHT);
  if (sect.name==SLIDE) addCircleTabs(groupObj,RIGHT);
}

drawGuide(svgDrawing.getElementById(GUIDE));
drawSlide(svgDrawing.getElementById(SLIDE));
 
svgDrawing.appendChild(text("BiasTapeMaker v"+versionNo,"version-tag",{x:"50%",y:20,fill:"#000","text-anchor":"middle"}));
svgDrawing.appendChild(text("Designed by Kendra Pendolino","credits-kpendolino",{x:"50%",y:40,fill:"#000","text-anchor":"middle"}));
