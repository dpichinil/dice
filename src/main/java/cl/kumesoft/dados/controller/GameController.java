package cl.kumesoft.dados.controller;

import cl.kumesoft.dados.dto.ResponseDto;
import cl.kumesoft.dados.dto.ThrowDto;
import cl.kumesoft.dados.service.GameService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/dice")
public class GameController {

    GameService service;

    public GameController(GameService service) {
        this.service = service;
    }

    @PostMapping("throw/{token}")
    public ResponseDto throwDice(@RequestBody ThrowDto dto, @PathVariable("token") String token){
        return service.throwDice(dto, token);
    }

    @GetMapping("get/{key}/{token}")
    public ResponseDto getThrowDice(@PathVariable("key") String key,
                                    @PathVariable("token") String token){
        return service.getThrowDice(key, token);
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
                                  @RequestBody ThrowDto dto){
        return service.createGame(token, dto);
    }

    @PostMapping("join/{token}")
    public ResponseDto joinGame(@PathVariable("token") String token,
                                  @RequestBody ThrowDto dto){
        return service.joinGame(token, dto);
    }
}
