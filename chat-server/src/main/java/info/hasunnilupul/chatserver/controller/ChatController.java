package info.hasunnilupul.chatserver.controller;

import info.hasunnilupul.chatserver.modal.Message;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import static info.hasunnilupul.chatserver.constants.KafkaConstants.KAFKA_MESSAGE_TOPIC;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(value = "/api/v1/chat")
@CrossOrigin(value = "http://localhost:3000")
public class ChatController {

    private final KafkaTemplate<String, Message> kafkaTemplate;

    public ChatController(KafkaTemplate<String, Message> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @PostMapping(value = "/messages", consumes = "application/json", produces = "application/json")
    public Message sendMessage(@RequestBody Message message){
        message.setTimestamp(LocalDateTime.now().toString());
        try {
            this.kafkaTemplate.send(KAFKA_MESSAGE_TOPIC, message).get();
            return message;
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return null;
        }
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/group")
    public Message broadcastGroupMessage(@Payload Message message) {
        return message;
    }
}
