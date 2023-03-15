class User < ApplicationRecord
    validates :username, :password_digest, :session_token, presence: true
    validates :username, uniqueness: true, length: { minimum: 3 }
    validates :password, length: { minimum: 8 }, allow_nil: true

    attr_reader :password
    after_initialize :ensure_session_token

    has_many :reviews, foreign_key: :author_id

    has_many :lists, foreign_key: :author_id

    has_one_attached :profile_photo

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def ensure_session_token
        self.session_token ||= SecureRandom::urlsafe_base64
    end

    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64
        self.save!
        self.session_token
    end

    def nilify_blanks
        self.name = nil if self.name == ''
        self.biography = nil if self.biography == ''
    end
end
