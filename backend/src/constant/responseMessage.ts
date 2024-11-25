const enum ErrorCode {
  InvalidEmail = "Invalid email",
  InvalidPassword = "Invalid password",
  InvalidEmailOrPassword = "Invalid email or password",
  UserAlreadyExist = "User already exist",
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
  InternalServerError = "Internal server error",
  ZodValidationError = "Zod validation error"
}

const enum SuccessCode {
  LoginSuccess = "Login successfully",
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

const enum ZodSchemaError {
  MustBeValidEmail = "Email must be a valid email address",
  MinEmailLength = "Email must be at least 3 characters long",
  MinPasswordLength = "Password must be at least 8 characters long",
  MaxPasswordLength = "Password must be at most 30 characters long",
  UpperCaseLetter = "Password must contain at least one uppercase letter",
  LowerCaseLetter = "Password must contain at least one lowercase letter",
  MustContainNumber = "Password must contain at least one number",
  SpecialCharacter = "Password must contain at least one special character",
  PasswordRequired = "Password is required",
  MinMaxVerificationCodeLength = "Verification code must be at least 6 characters long"
}

export { ErrorCode, SuccessCode, ZodSchemaError };
