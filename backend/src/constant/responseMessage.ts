const enum ErrorCode {
  InvalidEmailOrPassword = "Invalid email or password",
  UserExist = "User already exist",
  UserNotFound = "User not found",
  InvalidVerificationCode = "Invalid or Expired verification code",
  PasswordNotMatch = "Password not match",
  NoteNotFound = "Note not found",
  NoteArchived = "Note already archived",
  NoteUnarchived = "Note already unarchived",
  NoteDeleted = "Note already deleted",
  NoteUpdated = "Note already updated",
  NoteCreated = "Note already created",
  VerifyEmail = "Please verify your email",
  InternalServerError = "Internal server error"
}

const enum SuccessCode {
  UserCreated = "User created successfully",
  UserUpdated = "User updated successfully",
  UserDeleted = "User deleted successfully",
  UserVerified = "User verified successfully",
  PasswordReset = "Password reset successfully",
  EmailSent = "Email sent successfully",
  EmailVerified = "Email successfully verified",
  PasswordChanged = "Password changed successfully",
  NoteCreated = "Note created successfully",
  NoteUpdated = "Note updated successfully",
  NoteDeleted = "Note deleted successfully",
  NoteArchived = "Note archived successfully",
  NoteUnarchived = "Note unarchived successfully"
}

export { ErrorCode, SuccessCode };
