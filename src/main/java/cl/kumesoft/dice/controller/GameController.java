package cl.kumesoft.dice.controller;

import cl.kumesoft.dice.dto.ResponseDto;
import cl.kumesoft.dice.dto.RollDto;
import cl.kumesoft.dice.service.GameService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/dice")
public class GameController {

    GameService service;

    public GameController(GameService service) {
        this.service = service;
    }

    @PostMapping("roll/{token}")
    public ResponseDto rollDice(@RequestBody RollDto dto, @PathVariable("token") String token){
        return service.rollDice(dto, token);
    }

    @GetMapping("get/{key}/{token}")
    public ResponseDto getRollDice(@PathVariable("key") String key,
                                    @PathVariable("token") String token){
        return service.getRollDice(key, token);
    }

    @GetMapping("remove/{key}/{token}")
    public ResponseDto removeGame(@PathVariable("key") String key,
                                  @PathVariable("token") String token){
        return service.removeGame(key, token);
    }

    @GetMapping("modify/{key}/{token}")
    public ResponseDto modifyGame(@PathVariable("key") String key,
                                  @PathVariable("token") String token){
        return service.modifyGame(key, token);
    }

    @PostMapping("create/{token}")
    public ResponseDto createGame(@PathVariable("token") String token,
                                  @RequestBody RollDto dto){
        return service.createGame(token, dto);
    }

    @PostMapping("join/{token}")
    public ResponseDto joinGame(@PathVariable("token") String token,
                                  @RequestBody RollDto dto){
        return service.joinGame(token, dto);
    }
}
