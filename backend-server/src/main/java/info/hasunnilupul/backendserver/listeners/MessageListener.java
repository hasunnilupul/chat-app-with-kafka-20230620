package info.hasunnilupul.backendserver.listeners;

import info.hasunnilupul.backendserver.modal.Message;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import static info.hasunnilupul.backendserver.constants.KafkaConstants.CONSUMER_GROUP_ID;
import static info.hasunnilupul.backendserver.constants.KafkaConstants.KAFKA_MESSAGE_TOPIC;

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
