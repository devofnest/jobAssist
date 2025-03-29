from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class Platform(Base):
    __tablename__ = 'platforms'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    base_url = Column(String)
    # 관계 설정: 한 플랫폼은 여러 채용 공고를 가질 수 있음
    job_postings = relationship("JobPosting", back_populates="platform")

class JobPosting(Base):
    __tablename__ = 'job_postings'
    id = Column(Integer, primary_key=True)
    platform_id = Column(Integer, ForeignKey('platforms.id'))
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    location = Column(String)
    description = Column(Text)
    url = Column(String, unique=True)  # 중복 방지
    posted_date = Column(DateTime)
    crawled_at = Column(DateTime, default=datetime.datetime.utcnow)
    # 관계 설정: 각 채용 공고는 하나의 플랫폼에 속함
    platform = relationship("Platform", back_populates="job_postings")
    
# 데이터베이스 연결 및 테이블 생성 예시
engine = create_engine('sqlite:///job_database.db')
Base.metadata.create_all(engine)