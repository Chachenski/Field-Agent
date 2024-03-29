package learn.field_agent.domain;

import learn.field_agent.data.AgencyAgentRepository;
import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.AgencyAgent;
import learn.field_agent.models.Alias;
import learn.field_agent.models.SecurityClearance;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SecurityClearanceService {
    public final SecurityClearanceRepository repository;
    public final AgencyAgentRepository agencyAgentRepository;

    public SecurityClearanceService(SecurityClearanceRepository repository, AgencyAgentRepository agencyAgentRepository) {
        this.repository = repository;
        this.agencyAgentRepository = agencyAgentRepository;
    }

    public List<SecurityClearance> findAll() {
        return repository.findAll();
    }

    public SecurityClearance findById(int securityClearanceId) {
        return repository.findById(securityClearanceId);
    }

    public Result<SecurityClearance> add(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = validate(securityClearance);
        if (!result.isSuccess()) {
            return result;
        }
        if (securityClearance.getSecurityClearanceId() != 0) {
            result.addMessage("securityClearanceId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }
        securityClearance = repository.add(securityClearance);
        result.setPayload(securityClearance);
        return result;
    }

    public Result<SecurityClearance> update(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = validate(securityClearance);
        if (!result.isSuccess()) {
            return result;
        }
        if (securityClearance.getSecurityClearanceId() <= 0) {
            result.addMessage("securityClearanceId must be set", ResultType.INVALID);
            return result;
        }
        if (!repository.update(securityClearance)) {
            String msg = String.format("securityClearanceId: %s does not exist", securityClearance.getSecurityClearanceId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<SecurityClearance> deleteById(int securityClearanceId) {
        Result<SecurityClearance> result = new Result<>();
        SecurityClearance securityClearance = findById(securityClearanceId);

        if (securityClearance == null) {
            result.addMessage("Security Clearance not found", ResultType.NOT_FOUND);
            return result;
        }

        if (repository.getUsageCount(securityClearanceId) > 0) {
            result.addMessage("Security Clearance is in use; cannot delete", ResultType.INVALID);
            return result;
        }

        if (!repository.deleteById(securityClearanceId)) {
            result.addMessage("Failed to delete Security Clearance", ResultType.INVALID);
        }
        result.setPayload(securityClearance);
        return result;
    }

    private Result<SecurityClearance> validate(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = new Result<>();
        if (securityClearance == null) {
            result.addMessage("Security Clearance cannot be null", ResultType.INVALID);
            return result;
        }
        if (securityClearance.getName() == null || securityClearance.getName().isBlank()) {
            result.addMessage("Name of Security Clearance is required", ResultType.INVALID);
        } else {
            List<SecurityClearance> existingClearances = repository.findAll();
            for (SecurityClearance existingClearance : existingClearances) {
                if (existingClearance.getName().equals(securityClearance.getName())) {
                    result.addMessage("Security Clearance with the same name already exists", ResultType.INVALID);
                    break;
                }
            }
        }

        List<SecurityClearance> existingClearances = repository.findAll();
        boolean clearanceExists = false;

        for (SecurityClearance existingClearance : existingClearances) {
            if (existingClearance.getSecurityClearanceId() == securityClearance.getSecurityClearanceId()) {
                clearanceExists = true;
            }
        }
        return result;
    }
}
