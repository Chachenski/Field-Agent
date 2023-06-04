package data;

import learn.field_agent.data.SecurityClearanceJdbcTemplateRepository;
import learn.field_agent.models.Agency;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class SecurityClearanceJdbcTemplateRepositoryTest {
    final static int NEXT_ID = 3;

    @Autowired
    SecurityClearanceJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<SecurityClearance> securityClearances = repository.findAll();
        assertNotNull(securityClearances);
        assertTrue(securityClearances.size() > 0);
    }

    @Test
    void shouldFindById() {
        SecurityClearance secret = new SecurityClearance(1, "Secret");
        SecurityClearance topSecret = new SecurityClearance(2, "Top Secret");

        SecurityClearance actual = repository.findById(1);
        assertEquals(secret, actual);

        actual = repository.findById(2);
        assertEquals(topSecret, actual);

        actual = repository.findById(3);
        assertEquals(null, actual);
    }

    @Test
    void shouldAddClearance() {
        SecurityClearance securityClearance = new SecurityClearance();
        SecurityClearance actual = repository.add(securityClearance);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getSecurityClearanceId());
    }

    @Test
    void shouldUpdateClearance() {
        SecurityClearance securityClearance = new SecurityClearance();
        securityClearance.setSecurityClearanceId(1);
        securityClearance.setName("Yankee White");
        assertTrue(repository.update(securityClearance));
    }

    @Test
    void shouldDeleteById() {
        assertTrue(repository.deleteById(1));
        assertFalse(repository.deleteById(1));
    }

    @Test
    void shouldGetUsageCount() {
        int securityClearanceId = 1;
        int usageCount = repository.getUsageCount(securityClearanceId);
        assertEquals(1, usageCount);
    }
}