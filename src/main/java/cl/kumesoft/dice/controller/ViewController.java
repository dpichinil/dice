package cl.kumesoft.dice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping({"/","index"})
    public String index(){
        return "index";
    }

    @GetMapping("home")
    public String home(){
        return "home";
    }
}
