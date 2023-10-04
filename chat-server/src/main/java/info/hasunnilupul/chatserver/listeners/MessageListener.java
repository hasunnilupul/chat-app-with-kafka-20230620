package info.hasunnilupul.chatserver.listeners;

import info.hasunnilupul.chatserver.modal.Message;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import static info.hasunnilupul.chatserver.constants.KafkaConstants.CONSUMER_GROUP_ID;
import static info.hasunnilupul.chatserver.constants.KafkaConstants.KAFKA_MESSAGE_TOPIC;

@Component
public class MessageListener {
    private final SimpMessagingTemplate template;

    public MessageListener(SimpMessagingTemplate template) {
        this.template = template;
    }

    @KafkaListener(
            topics = KAFKA_MESSAGE_TOPIC,
            groupId = CONSUMER_GROUP_ID
    )

    public void listen(Message message) {
        System.out.println("sending via kafka listener..");
        template.convertAndSend("/topic/group", message);
    }
}
