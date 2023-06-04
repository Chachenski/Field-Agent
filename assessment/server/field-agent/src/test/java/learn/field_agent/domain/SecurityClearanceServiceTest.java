package learn.field_agent.domain;

import learn.field_agent.data.AgencyAgentRepository;
import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class SecurityClearanceServiceTest {
    @Autowired
    SecurityClearanceService service;
    @MockBean
    SecurityClearanceRepository repository;
    @MockBean
    AgencyAgentRepository agencyAgentRepository;

    @Test
    void shouldNotAddNull() {
        Result<SecurityClearance> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddIfAgencyAgentDoesNotExist() {
        Result<SecurityClearance> result = service.add(null);
        SecurityClearance securityClearance = new SecurityClearance();
        securityClearance.setSecurityClearanceId(3);
//        when(agencyAgentRepository.add(1)).thenReturn(null);
        result = service.add(securityClearance);
        assertEquals(ResultType.INVALID, result.getType());
    }
}