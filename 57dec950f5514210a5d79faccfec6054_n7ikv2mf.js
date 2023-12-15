let AbstractWorkflowAPIHandler = require("AbstractWorkflowAPIHandler");
class WorkflowAPIHandler extends AbstractWorkflowAPIHandler {
  // 流程实例初始化
  processInstanceStart(processStartMessage) {}
  // 流程完成
  processInstanceEnd(processStateChangeMessage) {
    if (processStateChangeMessage.processEnd) {
      let func = extrequire("GT30660AT4.backDefaultGroup.ProcessEnd");
      let res = func.execute(processStateChangeMessage);
    }
  }
  // 环节结束
  activityComplete(activityEndMessage) {}
}
exports({ entryPoint: WorkflowAPIHandler });