package ext.dgt.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/test") // http://plmdev.digiteki.com/Windchill/servlet/dgt/test
public class TestController {
	
	@RequestMapping("/sys")
	public ModelAndView test() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsp/test");
		
		return mv;
	}
}