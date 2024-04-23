package ext.dgt.part.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import ext.dgt.part.broker.DGPartBroker;
import ext.dgt.part.service.DGPartService;
import wt.part.WTPart;

@Controller
@RequestMapping("/part")
public class DGPartController {

	@Autowired
	private DGPartService service;

	@RequestMapping("/partList")
	public ModelAndView partList() throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("/jsp/part/searchPartList");

		return mv;
	}

	@RequestMapping("/partListAjax")
	public ModelAndView partListAjax() throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.addObject("partList", service.dgPartList());
		return mv;
	}

	@RequestMapping("/partSearch")
	public ModelAndView partSearch() throws Exception {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("/jsp/part/searchPart");

		return mv;
	}
	@RequestMapping("/partSearchAjax")
	public ModelAndView partSearchAjax(@RequestParam Map<String, Object> param) throws Exception {
		ModelAndView mv = new ModelAndView();
		List<DGPartBroker> partList = service.dgPartSearch(param);
		mv.addObject("partList", partList);
		return mv;
	}
	
	@RequestMapping("/partSave")
	public ModelAndView partSave() throws Exception{
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/jsp/part/createPart");
		return mv;
	}
	@RequestMapping("/partSaveAjax")
	public ModelAndView partSaveAjax(@RequestParam Map<String, Object> param) throws Exception{
		ModelAndView mv = new ModelAndView();
		service.dgPartSave(param);
		mv.setViewName("/jsp/part/searchPart");
		return mv;
	}
	
	@RequestMapping("/partDetail")
	public ModelAndView partDetail(@RequestParam Map<String, Object> param) throws Exception{
		ModelAndView mv = new ModelAndView();
		DGPartBroker part = service.dgPartDetail(param);
		mv.addObject("part",part);
		mv.setViewName("/jsp/part/partDetail");
		return mv;
	}
	
	@RequestMapping("/partUpdate")
	public ModelAndView partUpdate(@RequestParam Map<String, Object> param)throws Exception {
		ModelAndView mv = new ModelAndView();
		DGPartBroker broker= service.dgPartDetail(param);
		mv.addObject("part",broker);
		mv.setViewName("/jsp/part/partUpdateDelete");
		return mv;
	}
	@RequestMapping("/partUpdateAjax")
	public ModelAndView partUpdateAjax(@RequestParam Map<String, Object> param)throws Exception {
		ModelAndView mv = new ModelAndView();
		WTPart part= service.dgPartUpdate(param);
		mv.addObject("part",part);
		mv.setViewName("/jsp/part/searchPartList");
		return mv;
	}
	
	@RequestMapping("/partDelete")
	public ModelAndView partDelete(@RequestParam Map<String, Object> param) throws Exception {
		ModelAndView mv = new ModelAndView();
		service.dgPartDelete(param);
		mv.setViewName("/jsp/part/searchPartList");
		return mv;
	}
}
