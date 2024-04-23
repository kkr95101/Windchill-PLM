package ext.dgt.document.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import ext.dgt.common.CommonUtil;
import ext.dgt.document.DGTechDoc;
import ext.dgt.document.broker.DGDocBroker;
import ext.dgt.document.broker.DGTechBroker;
import ext.dgt.document.service.DGDocService;

@Controller
@RequestMapping("/doc")
public class DGDocController {
	@Autowired
	private DGDocService service;

	@RequestMapping("/docList")
	public ModelAndView docList() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsp/document/docList");
		return mv;
	}

	@RequestMapping("/getDocList")
	public ModelAndView getDocList() throws Exception {
		List<DGTechBroker> docList = service.getDocList();

		return new ModelAndView().addObject("docList", docList);
	}

	@RequestMapping("/createDoc")
	public ModelAndView createDoc() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/jsp/document/createDoc");
		return mv;
	}

	@RequestMapping("/saveDoc")
	public ModelAndView saveDoc(@RequestParam Map<String, Object> param) throws Exception {
		ModelAndView mv = new ModelAndView();
		System.out.println("name: " + param.get("name"));
		System.out.println("description: " + param.get("description"));
		System.out.println("userName: " + param.get("userName"));
		System.out.println("userAge: " + param.get("userAge"));

		DGTechDoc doc = service.saveDoc(param);
		System.out.println(CommonUtil.getLongOid(doc) + "::::oid");
		mv.setViewName("/jsp/document/doc");
		return mv;
	}

	@RequestMapping("/getDoc")
	public ModelAndView getdoc() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/jsp/document/doc");
		return mv;
	}

	@RequestMapping("/getDGdoc")
	public ModelAndView getDGdoc() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/jsp/document/getDgDocList");
		return mv;
	}

	@RequestMapping("/getDGdocAjax")
	public ModelAndView getDGdocAjax(@RequestParam Map<String, Object> param) throws Exception {
		System.out.println("name::::::::::::::::::::"+param.get("name"));
		ModelAndView mv = new ModelAndView();
		List<DGTechBroker> docList = service.getDGdoc(param);
		System.out.println("name::::::::::::::::::::"+docList.get(0).getUserOrg());
		mv.addObject("docList", docList);
		return mv;
	}
	
	@RequestMapping("/docDetail")
	public ModelAndView docDetail(@RequestParam Map<String, Object> param) throws Exception {
		ModelAndView mv = new ModelAndView();
		DGTechBroker doc = service.getDetail(param);
		mv.setViewName("/jsp/document/docDetail");
		mv.addObject("doc",doc);
		return mv;
	}
	
	@RequestMapping("/docUpdateDoc")
	public ModelAndView docUpdateDoc(@RequestParam Map<String, Object> param) throws Exception{
		ModelAndView mv = new ModelAndView();
		DGTechBroker doc = service.getDetail(param);
		mv.addObject("doc",doc);
		mv.setViewName("/jsp/document/docUpdateDelete");
		return mv;
	}
	
	@RequestMapping("/docUpdate")
	public ModelAndView docUpdate(@RequestParam Map<String, Object> param) throws Exception{
		ModelAndView mv = new ModelAndView();
		DGTechDoc doc = service.updateDoc(param);
		mv.addObject("doc",doc);
		mv.setViewName("/jsp/document/doc");
		return mv;
	}
	@RequestMapping("/docDelete")
	public ModelAndView docDelete(@RequestParam Map<String, Object> param)throws Exception {
		ModelAndView mv = new ModelAndView();
		service.deleteTechDoc(param);
		mv.setViewName("/jsp/document/docList");
		return mv;
	}
	@RequestMapping("/docPicker")
	public ModelAndView docPicker()throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/jsp/document/tempGetDgDocList");
		return mv;
	}
	
}
