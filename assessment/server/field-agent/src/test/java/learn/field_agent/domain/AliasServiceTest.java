package learn.field_agent.domain;

import learn.field_agent.data.AgentRepository;
import learn.field_agent.data.AliasRepository;
import learn.field_agent.models.Agent;
import learn.field_agent.models.Alias;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AliasServiceTest {
    @Autowired
    AliasService service;
    @MockBean
    AliasRepository repository;
    @MockBean
    AgentRepository agentRepository;

    @Test
    void shouldNotAddNull(){
        // should not add null
        Result<Alias> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getType());
    }
    @Test
    void shouldNotAddIfAgentDoesNotExist(){
        Alias alias = new Alias();
        alias.setAliasId(0);
        when(agentRepository.findById(1)).thenReturn(null);
        Result<Alias> result = service.add(alias);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddIfAliasIdIsGreaterThanZero(){
        Alias alias = new Alias();
        alias.setAliasId(9);
        Result<Alias> result = service.add(alias);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddBlankName(){
        Alias alias = new Alias();
        alias.setAliasId(0);
        alias.setName("");
        Result<Alias> result = service.add(alias);
        assertEquals(ResultType.INVALID, result.getType());
    }
    @Test
    void shouldNotAddDuplicateNameIfPersonaIsEmpty(){
        Alias alias = new Alias();
        alias.setAliasId(0);
        alias.setName("Shadow");
        alias.setAgentId(1);
        Agent agent = new Agent();

        Alias shadow = new Alias(1, "Shadow", "", 1);
        when(repository.findByName("Shadow")).thenReturn(List.of(alias));
        when(agentRepository.findById(1)).thenReturn(agent);
        alias.setAgentId(4);
        Result<Alias> result = service.add(alias);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldAddWhenValid(){
        // make sure that an agent is found for all happy path test cases
        Agent agent = new Agent();
        when(agentRepository.findById(1)).thenReturn(agent);

        //should add
        Alias expected = new Alias();
        expected.setAliasId(1);
        expected.setAgentId(1);
        expected.setName("Shadow");

        Alias arg = new Alias();
        arg.setName("Shadow");
        arg.setAgentId(1);
        arg.setAliasId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<Alias> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());

        assertEquals(expected, result.getPayload());

        // should add even if a duplicate name is found
        // if the persona is unique

        Alias shadow = new Alias();
        shadow.setName("Shadow");
        when(repository.findByName("Shadow")).thenReturn(List.of(shadow));
        arg = new Alias();
        arg.setName("Shadow");
        arg.setAliasId(0);
        arg.setPersona("A shadow in the night");
        arg.setAgentId(1);

        when(repository.add(arg)).thenReturn(expected);
        result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());

    }


}