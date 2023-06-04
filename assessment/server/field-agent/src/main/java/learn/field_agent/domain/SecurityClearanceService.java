package learn.field_agent.domain;

import learn.field_agent.data.AgencyAgentRepository;
import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.AgencyAgent;
import learn.field_agent.models.SecurityClearance;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityClearanceService {
    public final SecurityClearanceRepository repository;
    public final AgencyAgentRepository agencyAgentRepository;

    public SecurityClearanceService(SecurityClearanceRepository repository, AgencyAgentRepository agencyAgentRepository) {
        this.repository = repository;
        this.agencyAgentRepository = agencyAgentRepository;
    }

    //    List<SecurityClearance> findAll()
//    SecurityClearance findById(int securityClearanceId)

    Result<SecurityClearance> add(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = validate(securityClearance);
        if (!result.isSuccess()) {
            return result;
        }
        if (securityClearance.getSecurityClearanceId() != 0) {
            result.addMessage("securityClearanceId cannot be added!", ResultType.INVALID);
            return result;
        }
        securityClearance = repository.add(securityClearance);
        result.setPayload(securityClearance);
        return result;
    }

//    Result<SecurityClearance> update(SecurityClearance securityClearance)
//    Result<SecurityClearance> deleteById(int securityClearanceId)

    private Result<SecurityClearance> validate(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = new Result<>();
        if (securityClearance == null) {
            result.addMessage("Security Clearance cannot be null", ResultType.INVALID);
            return result;
        }
        if (securityClearance.getName() == null || securityClearance.getName().isBlank()) {
            result.addMessage("Name of Security Clearance is required", ResultType.INVALID);
        }
        if (securityClearance.getSecurityClearanceId() == 0) {
            result.addMessage("securityClearanceId is required", ResultType.INVALID);
        }
        return result;
    }
}
