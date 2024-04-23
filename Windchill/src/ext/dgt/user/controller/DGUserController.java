package ext.dgt.user.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import ext.dgt.user.service.DGUserService;

@Controller
@RequestMapping("/user")
public class DGUserController {
	@Autowired
	private DGUserService service;
	
	// 회원리스트 - jstl
	@RequestMapping("/getUsers")
	public ModelAndView getUsersJ() {
		ModelAndView mv = new ModelAndView();
		List<Map<String, Object>> userList = service.getUsersMp();
		for (Map<String, Object> user : userList) {
			System.out.println("이름 :::: " + user.get("name"));
			System.out.println("oid :::: " + user.get("oid"));
			System.out.println("이메일 :::: " + user.get("email"));
			System.out.println("가입일 :::: " + user.get("regDate"));
		}
		mv.setViewName("jsp/user/getUsers");
		mv.addObject("userList", userList);
		return mv;
	}
	

	// 회원리스트 - dhtmlx
	@RequestMapping("/users")
	public ModelAndView users() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsp/user/searchUser");
		
		return mv;
	}
	
	@RequestMapping("/searchUser")
	public ModelAndView searchUser() {
		ModelAndView mv = new ModelAndView();
		List<Map<String, Object>> userList = service.getUsersMp();

		mv.addObject("userList", userList);
		return mv;
	}
	
	
	// 회원 리스트 - QuerySpec
	// 회원 리스트 jsp
	@RequestMapping("/users/qs")
	public ModelAndView usersQs() {
		return new ModelAndView("/jsp/user/searchUserQs");
	}
	
	// 회원 리스트 출력
	@RequestMapping("/getUsers/qs")
	public ModelAndView getUsersQs() throws Exception {
		ModelAndView mv = new ModelAndView();
		List<Map<String, Object>> userList = service.getUsersQs();
		mv.addObject("userList",userList);
		
		return mv;
	}
	
	// 회원 상세
	@RequestMapping("/viewUser")
	public void viewUser(@RequestParam Map<String, Object> param) throws Exception {
		Map<String, Object> user = service.viewUser(param);
		System.out.println(user.get("name"));
		System.out.println(user.get("email"));
		System.out.println(user.get("org"));
	}
	
	
	
	
	// 회원 리스트 - QuerySpec / broker 사용
	@RequestMapping("/users/qss")
	public ModelAndView usersQss() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/jsp/user/searchUserQss");
		return mv;
	}
	
	@RequestMapping("/getUsers/qss")
	public ModelAndView getUsersQss() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.addObject("userList", service.getUsersQss());
		System.out.println(" Controll:::::::::"+service.getUsersQss().get(0).getDisplayName());
		return mv;
	}
	
	
	@RequestMapping("/viewUser2")
	public ModelAndView viewUser2(@RequestParam Map<String, Object> param) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/jsp/user/viewUser");
		mv.addObject("user",service.viewUser2(param));
		
		return mv;
	}
	
	@RequestMapping("create")
	public ModelAndView create() {
		return new ModelAndView("jsp/user/createUser");
	}
	
	@RequestMapping("/saveUser")
	public void saveUser() throws Exception {
		service.createUser();
	}
	
	
}
